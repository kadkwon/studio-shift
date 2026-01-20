import { NextResponse } from "next/server";

interface InquiryData {
  name: string;
  contact: string;
  location: string;
  area: string;
}

export async function POST(request: Request) {
  try {
    const body: InquiryData = await request.json();
    const { name, contact, location, area } = body;

    // Send Telegram Notification
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      const message = `🔔 [Studio Shift 상담 신청]
━━━━━━━━━━━━━━━━
👤 이름: ${name}
📞 연락처: ${contact}
📍 위치: ${location}
📐 면적: ${area}
━━━━━━━━━━━━━━━━
💰 상담비: 100,000원
⏰ 접수시간: ${new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}`;

      const response = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
          }),
        }
      );

      if (!response.ok) {
        console.error("Telegram API error:", await response.text());
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Inquiry submission error:", error);
    return NextResponse.json(
      { success: false, error: "문의 접수 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
