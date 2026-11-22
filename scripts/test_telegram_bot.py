import sys
import requests

TOKEN = "9124593455:AAH3yJZF8NOCPUSUQcj_hAITdATSvTffKTE"

def main():
    print("Checking Telegram Bot getMe...")
    r = requests.get(f"https://api.telegram.org/bot{TOKEN}/getMe")
    print("Bot info:", r.json())

    print("\nChecking getUpdates for recent messages...")
    r_updates = requests.get(f"https://api.telegram.org/bot{TOKEN}/getUpdates")
    data = r_updates.json()
    print("Updates:", data)

    results = data.get("result", [])
    if results:
        last = results[-1]
        chat = last.get("message", {}).get("chat", {})
        chat_id = chat.get("id")
        user = last.get("message", {}).get("from", {})
        print(f"\n🎉 FOUND CHAT ID: {chat_id}")
        print(f"User: {user.get('first_name')} (@{user.get('username')})")

        # Send test message
        test_msg = "🚀 <b>[ASMIRE TELEGRAM BOT ĐÃ KẾT NỐI THÀNH CÔNG!]</b>\n\nXin chào Admin! Kể từ bây giờ bạn sẽ nhận được thông báo tức thì khi có:\n1. 🔔 Review và hóa đơn đối soát mới nộp.\n2. 📦 Khách hàng claim Snapshot Agency OS / SME OS.\n3. 💰 Giao dịch nâng cấp tài khoản thành công.\n\nHệ thống đang trực tuyến tại https://asmire.me"
        send_res = requests.post(
            f"https://api.telegram.org/bot{TOKEN}/sendMessage",
            json={
                "chat_id": chat_id,
                "text": test_msg,
                "parse_mode": "HTML",
            }
        )
        print("Test message send status:", send_res.json())
        return chat_id
    else:
        print("\n⚠️ No messages received yet.")
        print("Please open https://t.me/asmireme_bot and click Start or send any message, then re-run this script.")
        return None

if __name__ == "__main__":
    main()
