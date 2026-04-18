import json
import os
import urllib.request
import urllib.parse


def handler(event: dict, context) -> dict:
    """Отправляет заявку или запись из форм сайта в Telegram-бот."""
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    try:
        body = json.loads(event.get("body") or "{}")
    except Exception:
        return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "invalid json"})}

    bot_token = os.environ.get("TELEGRAM_BOT_TOKEN", "")
    chat_id = os.environ.get("TELEGRAM_CHAT_ID", "")

    if not bot_token or not chat_id:
        return {"statusCode": 500, "headers": cors, "body": json.dumps({"error": "bot not configured"})}

    form_type = body.get("type", "quick")

    if form_type == "booking":
        text = (
            "📅 <b>Новая онлайн-запись</b>\n\n"
            f"👤 Имя: {body.get('name', '—')}\n"
            f"📞 Телефон: {body.get('phone', '—')}\n"
            f"🔧 Услуга: {body.get('service', '—')}\n"
            f"📆 Дата: {body.get('date', '—')}\n"
            f"🕐 Время: {body.get('time', '—')}\n"
            f"🚗 Авто: {body.get('car', '—')}"
        )
    else:
        text = (
            "⚡ <b>Быстрая заявка с сайта</b>\n\n"
            f"👤 Имя: {body.get('name', '—')}\n"
            f"📞 Телефон: {body.get('phone', '—')}\n"
            f"🔧 Услуга: {body.get('service', '—')}\n"
            f"💬 Комментарий: {body.get('comment', '—')}"
        )

    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    payload = json.dumps({
        "chat_id": chat_id,
        "text": text,
        "parse_mode": "HTML",
    }).encode()

    req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            tg_response = resp.read().decode()
            print(f"[TG OK] {tg_response}")
    except urllib.error.HTTPError as e:
        error_body = e.read().decode()
        print(f"[TG ERROR] status={e.code} chat_id={chat_id!r} token_prefix={bot_token[:10]!r} response={error_body}")
        return {"statusCode": 502, "headers": cors, "body": json.dumps({"error": "telegram error", "detail": error_body})}

    return {
        "statusCode": 200,
        "headers": cors,
        "body": json.dumps({"ok": True}),
    }