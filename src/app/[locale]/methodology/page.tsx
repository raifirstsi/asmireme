import React from "react";
import { Locale } from "@/lib/i18n";
import { CheckCircle, Sliders, Cpu, ShieldAlert, Award } from "lucide-react";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return {
    title: locale === "vi" ? "Quy Trình & Tiêu Chuẩn Thử Nghiệm Thực Tế — Asmire" : "Empirical Testing Methodology — Asmire",
    description: "How Asmire evaluates, benchmarks, and scores all 50 AI SaaS tools using standardized production workloads.",
  };
}

export default async function MethodologyPage({ params }: PageProps) {
  const { locale } = await params;
  const isVi = locale === "vi";

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl space-y-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
            <Award className="h-4 w-4" />
            <span>E-E-A-T Quality Standard</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            {isVi ? "Quy Trình & Tiêu Chuẩn Kiểm Thử Thực Nghiệm" : "Empirical Testing Methodology"}
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {isVi
              ? "Chúng tôi không bao giờ xào lại tài liệu quảng cáo của nhà cung cấp. Mọi công cụ AI trên Asmire đều phải vượt qua bộ kịch bản thử nghiệm công việc thực tế với dữ liệu đầu ra và thời gian xử lý cụ thể."
              : "We never rehash vendor marketing copy. Every AI SaaS tool indexed on Asmire undergoes standardized real-world workloads with recorded outputs, processing latencies, and token costs."}
          </p>
        </div>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-foreground/90 leading-relaxed text-sm">
          <h2 className="text-lg font-bold text-foreground">
            {isVi ? "1. Công Thức Tính Điểm Đánh Giá Biên Tập" : "1. The 5-Pillar Weighted Scoring Rubric"}
          </h2>
          <p>
            {isVi
              ? "Mỗi công cụ nhận điểm tổng thể từ 0.0 đến 5.0 dựa trên công thức trọng số cố định đã được công bố minh bạch:"
              : "Each tool receives an objective composite score from 0.0 to 5.0 derived from our fixed, published rubric:"}
          </p>
          <div className="p-4 rounded-xl border border-border bg-card font-mono text-xs text-foreground/90 space-y-1">
            <p><strong>Score</strong> = (Core Features × 25%) + (Value for Money × 25%) + (Ease of Use × 20%) + (Stability & Speed × 15%) + (Integrations × 15%)</p>
          </div>

          <h2 className="text-lg font-bold text-foreground">
            {isVi ? "2. Bằng Chứng Thử Nghiệm Bắt Buộc (Artifacts)" : "2. Mandatory Empirical Artifacts"}
          </h2>
          <p>
            {isVi
              ? "Để một bài đánh giá được phép xuất bản trên Asmire, biên tập viên bắt buộc phải đính kèm:"
              : "Before any review is cleared for publication on Asmire, the testing editor must document:"}
          </p>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li><strong>Câu lệnh chuẩn (Prompt):</strong> Kịch bản đầu vào thống nhất giữa các công cụ trong cùng chuyên mục.</li>
            <li><strong>Sản phẩm đầu ra gốc:</strong> Ảnh chụp màn hình chất lượng cao, tệp âm thanh hoặc video clip do AI tạo ra.</li>
            <li><strong>Thông số kỹ thuật:</strong> Thời gian phản hồi đến byte đầu tiên (TTFB), thời gian kết xuất video, và mức tiêu hao tín dụng thực tế.</li>
            <li><strong>Ngày kiểm chứng:</strong> Mọi thông số giá gói và tính năng đều gắn nhãn ngày kiểm tra rõ ràng.</li>
          </ul>

          <h2 className="text-lg font-bold text-foreground">
            {isVi ? "3. Cập Nhật Dữ Liệu Giá Tự Động Hàng Ngày" : "3. Continuous Price & Tier Monitoring"}
          </h2>
          <p>
            {isVi
              ? "Giá gói của các công cụ AI thường xuyên thay đổi số lượng token và mức giá. Hệ thống của chúng tôi theo dõi liên tục và hiển thị rõ ràng lịch sử thay đổi giá tại trang /pricing của từng tool."
              : "AI SaaS pricing plans frequently adjust credit limits and token costs. Our automated monitoring engine checks pricing endpoints daily, logging price shifts directly in the tool changelog."}
          </p>
        </div>
      </div>
    </div>
  );
}
