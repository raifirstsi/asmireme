import React from "react";
import { Locale } from "@/lib/i18n";
import { ShieldCheck, Info } from "lucide-react";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return {
    title: locale === "vi" ? "Công Khai Quan Hệ Liên Kết (Affiliate Disclosure) — Asmire" : "Affiliate Disclosure — Asmire",
    description: "Full FTC commercial disclosure and member referral attribution transparency for Asmire.",
  };
}

export default async function AffiliateDisclosurePage({ params }: PageProps) {
  const { locale } = await params;
  const isVi = locale === "vi";

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
            <ShieldCheck className="h-4 w-4" />
            <span>FTC & Commercial Compliance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            {isVi ? "Công Khai Quan Hệ Liên Kết (Affiliate Disclosure)" : "Affiliate & Referral Disclosure"}
          </h1>
          <p className="text-xs text-muted-foreground">
            {isVi ? "Cập nhật lần cuối: 21 tháng 11, 2027" : "Last Reviewed: November 21, 2027"}
          </p>
        </div>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-foreground/90 leading-relaxed text-sm">
          <div className="p-4 rounded-xl border border-brand-500/30 bg-brand-500/5 flex items-start gap-3">
            <Info className="h-5 w-5 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground m-0">
              {isVi
                ? "Asmire hoạt động theo nguyên tắc trung thực và minh bạch tuyệt đối. Việc nhận hoa hồng từ các hãng SaaS KHÔNG BAO GIỜ làm thay đổi kết quả thử nghiệm hay điểm số đánh giá của ban biên tập."
                : "Asmire operates under principles of radical transparency. Earning referral commissions from SaaS providers NEVER alters our empirical testing results or editorial scoring."}
            </p>
          </div>

          <h2 className="text-lg font-bold text-foreground">
            {isVi ? "1. Cách Thức Hoạt Động Của Liên Kết Affiliate" : "1. How Affiliate Links Work"}
          </h2>
          <p>
            {isVi
              ? "Một số đường link trên Asmire là các liên kết tiếp thị liên kết (affiliate links). Khi bạn nhấp vào nút 'Dùng thử', 'Xem giá' hoặc các nút kêu gọi hành động (CTA) và đăng ký mua phần mềm từ nhà cung cấp, chúng tôi (hoặc thành viên cộng đồng đã giới thiệu bạn) có thể nhận được một khoản hoa hồng nhỏ trực tiếp từ nhà cung cấp đó."
              : "Certain links on Asmire are affiliate links. When you click CTA buttons such as 'Visit Site' or 'Try Free' and subsequently purchase a subscription from the software vendor, we (or the community member who referred you) may receive a commission paid directly by the vendor."}
          </p>
          <p>
            {isVi
              ? "Khoản hoa hồng này được chi trả bởi chính nhà cung cấp SaaS từ ngân sách tiếp thị của họ. BẠN HOÀN TOÀN KHÔNG PHẢI TRẢ THÊM BẤT KỲ CHI PHÍ NÀO. Trên thực tế, nhiều liên kết của chúng tôi còn mang lại mức giá ưu đãi hoặc thời gian dùng thử dài hơn cho bạn."
              : "This commission is paid entirely by the SaaS vendor out of their standard marketing budget. YOU NEVER PAY ANY ADDITIONAL COST. In fact, many partner links provide extended trials or exclusive discounted pricing."}
          </p>

          <h2 className="text-lg font-bold text-foreground">
            {isVi ? "2. Hệ Thống Giới Thiệu Của Thành Viên (Member Referral Attribution)" : "2. Community Member Attribution"}
          </h2>
          <p>
            {isVi
              ? "Khác biệt với các trang web review truyền thống độc quyền hoa hồng cho chủ site, Asmire trao quyền cho các thành viên cộng đồng tự gắn link affiliate của chính họ. Khi bạn truy cập qua link chia sẻ của một thành viên, hệ thống của chúng tôi sẽ ưu tiên điều hướng đến link affiliate của thành viên đó để hãng ghi nhận doanh thu cho họ."
              : "Unlike traditional directories that monopolize 100% of affiliate revenue, Asmire empowers registered community members to insert their personal affiliate links. When you visit via a member's referral link, our server prioritizes routing CTA clicks to that member's affiliate account."}
          </p>
          <p>
            {isVi
              ? "Nếu công cụ chưa được thành viên gắn link hoặc vượt quá số lượng công cụ trong gói của họ, lượt bấm sẽ tự động quay về link affiliate của chủ site Asmire nhằm duy trì vận hành hệ thống máy chủ và kiểm thử phần mềm."
              : "If a specific tool has not been linked by the referring member or exceeds their plan entitlement, the click deterministically routes to the site owner's affiliate link to fund continuous server infrastructure and empirical testing."}
          </p>

          <h2 className="text-lg font-bold text-foreground">
            {isVi ? "3. Tính Độc Lập Tuyệt Đối Của Ban Biên Tập" : "3. Strict Editorial Independence"}
          </h2>
          <p>
            {isVi
              ? "Mức hoa hồng, việc phần mềm có chương trình affiliate hay không, và việc thành viên có gắn link hay không TUYỆT ĐỐI KHÔNG ảnh hưởng đến thứ hạng hay điểm số của công cụ trên Asmire. Chúng tôi luôn chỉ rõ các nhược điểm, hạn chế và trường hợp 'Không nên dùng' của từng công cụ."
              : "Commission rates, affiliate availability, and member linking have ZERO influence on a tool's editorial score or directory ranking. We rigorously document real drawbacks, performance bottlenecks, and explicit 'Who it is NOT for' verdicts for every tool."}
          </p>
        </div>
      </div>
    </div>
  );
}
