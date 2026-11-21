# Legal, Regulatory & Compliance Checklist
**Project**: Asmire (asmire.me)  
**Jurisdiction**: Vietnam (Operating Entity) & Global International Consumers (US, EU, UK)  
**Status**: Normative Compliance Framework  
**Date**: 2026-11-21  

---

## 1. Compliance Checklist & Responsibility Matrix

| # | Compliance Area | Requirement & Policy Implementation | Legal Standard / Regulation | Action Item & Status |
|---|---|---|---|---|
| 1 | **Affiliate Disclosure** | Unambiguous commercial disclosure on all review pages, comparison tables, and adjacent to `/go/` CTA buttons in both EN and VI. | FTC 16 CFR Part 255 / UK ASA Guidelines | **Enforced in Design Tokens & Components** |
| 2 | **Member Terms of Service (`/member-terms`)** | Prohibits brand bidding, self-referral, fake clicks, bot farming, and domain trademark infringement. Members are independent contractors responsible for their own tax filings. | Contract Law / Vendor ToS | **Documented in `/member-terms`** |
| 3 | **14-Day Refund Policy (`/refund-policy`)** | Unconditional 14-day refund on initial Pro ($29/mo) subscription payments via automated customer portal or support request. | EU Consumer Rights Directive (2011/83/EU) | **[NEEDS LAWYER CONFIRMATION]** |
| 4 | **No Income Guarantees** | Complete ban on claims of guaranteed revenue, earnings, or affiliate conversions for members. Standard and Pro plans provide software linking capabilities only. | FTC Anti-Deception Guides | **Enforced in UI Copy & Policy** |
| 5 | **Trademark & Logo Fair Use** | Use tool names and logos solely for nominative identification and comparative commentary. Zero use of words like "Official", "Authorized Partner", or modified vendor logos. | Trademark Fair Use Doctrine | **Enforced in Brand Assets** |
| 6 | **Cookie Consent & Privacy (`/privacy`)** | Consent banner for analytics and affiliate tracking in EU/UK regions. No cookie set for non-consenting visitors or automated bots. | GDPR / ePrivacy Directive / CCPA | **Enforced in Cookie Architecture** |
| 7 | **Corporate Tax on Foreign SaaS Sales** | Utilize a Merchant of Record (Paddle / Lemon Squeezy) to insulate the Vietnamese entity from international sales tax liabilities. | Circular 219/2013/TT-BTC (Vietnam) | **[NEEDS ACCOUNTANT CONFIRMATION]** |
| 8 | **Zero SSRF & Open Redirect Liability** | Strict server-side allowlist for all member-submitted affiliate URLs. Private IP blocking and Google Safe Browsing checks to prevent malware propagation. | Cybersecurity & CFAA | **Enforced in Security Architecture** |

---

## 2. Standard Public Disclosures (EN & VI)

### English FTC Disclosure (Universal Footer & CTA Adjacent):
> *"Asmire is an independent software review publication supported by referral and affiliate partnerships. When you purchase a tool through links on our site, we or the contributing community member who shared the link may earn an affiliate commission at no extra cost to you. Our editorial ratings and evaluations are conducted independently and are never influenced by compensation or partnership tiers. Learn more in our [Editorial Policy](/editorial-policy) and [Affiliate Disclosure](/affiliate-disclosure)."*

### Vietnamese FTC & Minh Bạch Thương Mại:
> *"Asmire là nền tảng đánh giá phần mềm độc lập, hoạt động dựa trên các chương trình liên kết (affiliate). Khi bạn đăng ký hoặc mua công cụ thông qua các đường link trên website, chúng tôi hoặc thành viên cộng đồng đã giới thiệu liên kết có thể nhận được hoa hồng từ nhà cung cấp mà không làm phát sinh thêm bất kỳ chi phí nào cho bạn. Điểm số đánh giá và kết quả thử nghiệm của ban biên tập hoàn toàn độc lập và không bị chi phối bởi hoa hồng hay gói thành viên. Xem chi tiết tại [Chính sách biên tập](/editorial-policy) và [Công khai liên kết](/affiliate-disclosure)."*

---

## 3. Explicit Items Requiring Professional Consultation

> [!WARNING]
> The following two items must be presented to the company's designated legal counsel and CPA:

1. **[LEGAL OPINION]**: Formally approve the English and Vietnamese drafts of `/member-terms` and `/refund-policy` to ensure complete insulation against third-party vendor trademark disputes caused by rogue members.
2. **[TAX ACCOUNTING OPINION]**: Provide official book entries for foreign currency receipts deposited into the company's Vietnamese commercial bank account from Paddle Payments, validating the 0% VAT export tax deduction.
