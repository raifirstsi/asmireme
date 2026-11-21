import React from "react";
import { Locale } from "@/lib/i18n";
import { FileCheck2, ShieldCheck, Check } from "lucide-react";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return {
    title: locale === "vi" ? "Chính Sách Biên Tập & Độc Lập Đánh Giá - Asmire" : "Editorial Policy & Independence - Asmire",
    description: "Our strict editorial guidelines guaranteeing objective AI software ratings free from sponsor bias.",
  };
}

export default async function EditorialPolicyPage({ params }: PageProps) {
  const { locale } = await params;
  const isVi = locale === "vi";

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl space-y-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
            <FileCheck2 className="h-4 w-4" />
            <span>Journalistic Integrity</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            {isVi ? "Chính Sách Biên Tập & Độc Lập Đánh Giá" : "Editorial Integrity & Scoring Policy"}
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {isVi
              ? "Niềm tin của người đọc là tài sản quý giá nhất của Asmire. Đọc bản cam kết chất lượng nội dung và quy chuẩn biên tập của chúng tôi."
              : "Reader trust is Asmire's most valuable asset. Learn how our editorial team maintains objective, evidence-based evaluations."}
          </p>
        </div>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-foreground/90 leading-relaxed text-sm">
          <h2 className="text-lg font-bold text-foreground">
            {isVi ? "1. Ba Điều 'KHÔNG' Của Ban Biên Tập Asmire" : "1. Our Three Unbreakable Editorial Rules"}
          </h2>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li><strong>KHÔNG nhận tiền để đổi điểm số:</strong> Các nhà phát hành phần mềm không thể trả tiền để nâng điểm sao hay mua vị trí trên bảng xếp hạng.</li>
            <li><strong>KHÔNG xuất bản bài viết mỏng (Thin Content):</strong> Mỗi bài viết phải dựa trên việc chạy thử kịch bản thực tế, chụp ảnh màn hình giao diện và ghi lại thông số tốc độ.</li>
            <li><strong>KHÔNG né tránh nhược điểm:</strong> Mọi bài đánh giá bắt buộc phải có mục 'Nhược điểm thật' và 'Ai KHÔNG nên dùng công cụ này'.</li>
          </ul>

          <h2 className="text-lg font-bold text-foreground">
            {isVi ? "2. Tách Biệt Giữa Doanh Thu Và Đánh Giá (Church & State)" : "2. Separation of Revenue and Editorial"}
          </h2>
          <p>
            {isVi
              ? "Đội ngũ biên tập viên đánh giá sản phẩm làm việc hoàn toàn độc lập với bộ phận kinh doanh và quản lý liên kết. Điểm số của một công cụ (ví dụ 4.8 hay 4.2) được xác định thuần túy bởi hiệu năng kỹ thuật, độ ổn định và giá trị mang lại cho người dùng, hoàn toàn không phụ thuộc vào việc hãng đó trả hoa hồng 10% hay 40%."
              : "Our testing and editorial teams operate under a strict separation from advertising and referral partnerships. A software's rating is dictated solely by technical performance, reliability, and value-for-money, completely irrespective of whether the vendor pays a 10% or 40% commission."}
          </p>
        </div>
      </div>
    </div>
  );
}
