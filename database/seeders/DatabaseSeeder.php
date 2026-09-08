<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\SiteSetting;
use App\Models\Service;
use App\Models\Stat;
use App\Models\Client;
use App\Models\CaseStudy;
use App\Models\Faq;
use App\Models\Inquiry;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Admin User
        User::updateOrCreate(
            ['email' => 'admin@atheranexus.id'],
            [
                'name' => 'Administrator Athera',
                'password' => Hash::make('admin12345'),
                'email_verified_at' => now(),
            ]
        );

        // 2. Site Settings
        $settings = [
            // General & Branding
            ['key' => 'site_name', 'value' => 'Athera Nexus', 'group' => 'general'],
            ['key' => 'company_name', 'value' => 'PT Adiwangsa Humanika Solusi', 'group' => 'general'],
            ['key' => 'tagline', 'value' => 'Human Capital Consulting', 'group' => 'general'],
            ['key' => 'meta_description', 'value' => 'Athera Nexus adalah praktik konsultasi human capital dari PT Adiwangsa Humanika Solusi. Solusi menyeluruh untuk siklus talenta dan transformasi organisasi.', 'group' => 'general'],

            // Contact Info
            ['key' => 'contact_email', 'value' => 'halo@atheranexus.id', 'group' => 'contact'],
            ['key' => 'partnership_email', 'value' => 'partnership@atheranexus.id', 'group' => 'contact'],
            ['key' => 'contact_phone', 'value' => '+62 21 5000 1234', 'group' => 'contact'],
            ['key' => 'contact_whatsapp', 'value' => '+62 811 9876 5432', 'group' => 'contact'],
            ['key' => 'contact_address', 'value' => "Menara Sudirman Lt. 21, Jl. Jend. Sudirman Kav. 60, Jakarta Selatan 12190, Indonesia", 'group' => 'contact'],
            ['key' => 'office_hours', 'value' => 'Senin – Jumat: 08:30 – 17:30 WIB', 'group' => 'contact'],

            // Social Media
            ['key' => 'social_instagram', 'value' => 'https://instagram.com', 'group' => 'social'],
            ['key' => 'social_facebook', 'value' => 'https://facebook.com', 'group' => 'social'],
            ['key' => 'social_whatsapp', 'value' => 'https://wa.me/6281198765432', 'group' => 'social'],

            // Hero Content - Beranda
            ['key' => 'hero_home_title_1', 'value' => 'Membangun Ekosistem', 'group' => 'hero'],
            ['key' => 'hero_home_title_2', 'value' => 'Human Capital yang', 'group' => 'hero'],
            ['key' => 'hero_home_title_3', 'value' => 'Berdaya Tahan.', 'group' => 'hero'],
            ['key' => 'hero_home_subtitle', 'value' => 'Konsultan human capital yang membantu organisasi tumbuh melalui strategi SDM yang terukur, akuisisi talenta yang presisi, dan pengembangan kepemimpinan yang berkelanjutan.', 'group' => 'hero'],

            // Hero Content - Layanan
            ['key' => 'hero_services_title_1', 'value' => 'Solusi Human Capital', 'group' => 'hero'],
            ['key' => 'hero_services_title_2', 'value' => 'Presisi untuk Setiap', 'group' => 'hero'],
            ['key' => 'hero_services_title_3', 'value' => 'Pertumbuhan Bisnis.', 'group' => 'hero'],
            ['key' => 'hero_services_subtitle', 'value' => 'Kami menggabungkan metodologi berbasis bukti (evidence-based), data analitik mutakhir, dan pemahaman mendalam atas regulasi bisnis Indonesia untuk menghadirkan dampak yang terukur.', 'group' => 'hero'],

            // Hero Content - Tentang Kami / Kepercayaan
            ['key' => 'hero_trust_title_1', 'value' => 'Dipercaya Korporasi', 'group' => 'hero'],
            ['key' => 'hero_trust_title_2', 'value' => 'yang Menuntut', 'group' => 'hero'],
            ['key' => 'hero_trust_title_3', 'value' => 'Integritas Tertinggi.', 'group' => 'hero'],
            ['key' => 'hero_trust_subtitle', 'value' => 'Kemitraan strategis yang berlandaskan pada kerahasiaan institusional, kepatuhan hukum 100%, dan standar eksekusi tanpa kompromi untuk organisasi terkemuka di Indonesia.', 'group' => 'hero'],

            // Hero Content - Kontak
            ['key' => 'hero_contact_title_1', 'value' => 'Mari Memulai', 'group' => 'hero'],
            ['key' => 'hero_contact_title_2', 'value' => 'Dialog Strategis', 'group' => 'hero'],
            ['key' => 'hero_contact_title_3', 'value' => 'Human Capital.', 'group' => 'hero'],
            ['key' => 'hero_contact_subtitle', 'value' => 'Ceritakan tantangan talenta dan sasaran pertumbuhan organisasi Anda. Tim partner senior kami siap memberikan telaah awal yang relevan dalam 1x24 jam kerja.', 'group' => 'hero'],
        ];

        foreach ($settings as $s) {
            SiteSetting::updateOrCreate(['key' => $s['key']], $s);
        }

        // 3. Services
        $services = [
            [
                'title' => 'Konsultasi Strategi HR & Desain Organisasi',
                'slug' => 'strategi-hr',
                'badge' => 'Strategic Advisory',
                'icon' => 'Compass',
                'description' => 'Perancangan fungsi SDM komprehensif yang menyelaraskan arsitektur human capital dengan visi jangka panjang dan sasaran profitabilitas bisnis.',
                'deliverables' => [
                    'Perancangan Struktur Organisasi & Analisis Beban Kerja (WLA)',
                    'Job Grading & Evaluasi Jabatan (Metodologi Teruji)',
                    'Remuneration & Compensation Structure (Salary Benchmarking)',
                    'Roadmap Strategis Human Capital 3-5 Tahun',
                ],
                'impact' => 'Efisiensi struktur hingga 28% dan kejelasan jalur akuntabilitas organisasi.',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Akuisisi & Asesmen Talenta Presisi',
                'slug' => 'akuisisi-talenta',
                'badge' => 'Executive & Talent Search',
                'icon' => 'UserSearch',
                'description' => 'Layanan executive search dan asesmen kompetensi mendalam untuk memastikan organisasi Anda dipimpin oleh talenta unggul yang sesuai secara kualitas dan budaya.',
                'deliverables' => [
                    'Executive Search untuk level C-Suite, Direksi & Senior Management',
                    'Assessment Center & Profiling Kompetensi Komprehensif',
                    'Psychological & Behavioral Evaluation',
                    'Background Check & Due Diligence Profesional',
                ],
                'impact' => 'Tingkat keberhasilan penempatan 95% dengan retensi tahun pertama di atas 92%.',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Pengembangan Kepemimpinan & Suksesi',
                'slug' => 'kepemimpinan',
                'badge' => 'Leadership Pipeline',
                'icon' => 'Award',
                'description' => 'Mempersiapkan generasi pemimpin masa depan melalui program terstruktur, executive coaching terakreditasi, dan peta suksesi tanpa hambatan.',
                'deliverables' => [
                    'Desain & Eksekusi Leadership Development Program (LDP)',
                    'Executive 1-on-1 Coaching bersama Certified Coaches',
                    'Peta Rencana Suksesi & High-Potential (HiPo) Identification',
                    'Penyusunan Kompetensi Kepemimpinan (Leadership Competency Matrix)',
                ],
                'impact' => 'Mempercepat kesiapan talenta suksesor internal hingga 2x lipat.',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'title' => 'People Analytics & Efisiensi Tenaga Kerja',
                'slug' => 'people-analytics',
                'badge' => 'Data-Driven HR',
                'icon' => 'BarChart3',
                'description' => 'Mengubah data kepegawaian yang terisolasi menjadi dashboard prediktif dan wawasan strategis untuk pengambilan keputusan manajemen yang tepat.',
                'deliverables' => [
                    'Implementasi HR Metrics & Executive Dashboard Interaktif',
                    'Predictive Attrition & Flight-Risk Modeling',
                    'Analisis Produktivitas & Return on Human Capital (ROHC)',
                    'Penyelarasan Key Performance Indicators (KPI & OKR)',
                ],
                'impact' => 'Penurunan tingkat turnover yang tidak terencana rata-rata 22% dalam 12 bulan.',
                'sort_order' => 4,
                'is_active' => true,
            ],
            [
                'title' => 'Transformasi Budaya & Manajemen Perubahan',
                'slug' => 'transformasi-budaya',
                'badge' => 'Culture & Change',
                'icon' => 'RefreshCcw',
                'description' => 'Memfasilitasi perubahan mindset dan perilaku kerja saat organisasi melakukan merger, ekspansi skala besar, atau digitalisasi proses bisnis.',
                'deliverables' => [
                    'Culture Diagnostic & Employee Engagement Audit',
                    'Change Management Framework & Change Champions Network',
                    'Post-Merger / Acquisition HR & Culture Integration',
                    'Desain Program Core Values Activation & Internalization',
                ],
                'impact' => 'Adopsi inisiatif perubahan mencapai 89% dalam 6 bulan pertama.',
                'sort_order' => 5,
                'is_active' => true,
            ],
            [
                'title' => 'HR Outsourcing & Kepatuhan Ketenagakerjaan',
                'slug' => 'hr-outsourcing',
                'badge' => 'Managed Operations',
                'icon' => 'Users',
                'description' => 'Dukungan operasional SDM menyeluruh mulai dari administrasi payroll, kepatuhan hukum tenaga kerja, hingga manajemen kontrak.',
                'deliverables' => [
                    'Full Payroll Processing, PPh 21, dan Pelaporan BPJS',
                    'Manajemen Hubungan Industrial & Kepatuhan UU Cipta Kerja',
                    'Employee Lifecycle Administration & Onboarding Support',
                    'Audit Kepatuhan Ketenagakerjaan (Labor Law Compliance)',
                ],
                'impact' => 'Jaminan 100% kepatuhan regulasi dengan zero penalty dan SLA pemrosesan tepat waktu.',
                'sort_order' => 6,
                'is_active' => true,
            ],
        ];

        foreach ($services as $srv) {
            Service::updateOrCreate(['slug' => $srv['slug']], $srv);
        }

        // 4. Stats
        $stats = [
            [
                'label' => 'Talenta & Profesional Terhubung',
                'value' => 10000,
                'suffix' => '+',
                'description' => 'Database talenta tervalidasi di berbagai spesialisasi industri',
                'sort_order' => 1,
            ],
            [
                'label' => 'Klien Korporat & Institusi',
                'value' => 120,
                'suffix' => '+',
                'description' => 'Dari perusahaan multinasional hingga BUMN dan unicorn',
                'sort_order' => 2,
            ],
            [
                'label' => 'Tahun Rekam Jejak Gabungan',
                'value' => 15,
                'suffix' => '+',
                'description' => 'Dipimpin oleh konsultan senior dan mantan eksekutif HR',
                'sort_order' => 3,
            ],
            [
                'label' => 'Tingkat Retensi Klien',
                'value' => 98,
                'suffix' => '%',
                'description' => 'Kemitraan jangka panjang berbasis kepuasan dan hasil nyata',
                'sort_order' => 4,
            ],
        ];

        foreach ($stats as $st) {
            Stat::updateOrCreate(['label' => $st['label']], $st);
        }

        // 5. Clients
        $clients = [
            ['name' => 'Nusantara Energi', 'sector' => 'Energi & Sumber Daya', 'sort_order' => 1],
            ['name' => 'Samudra Logistik', 'sector' => 'Supply Chain & Maritim', 'sort_order' => 2],
            ['name' => 'Arunika Bank', 'sector' => 'Perbankan & Finansial', 'sort_order' => 3],
            ['name' => 'Graha Medika', 'sector' => 'Layanan Kesehatan', 'sort_order' => 4],
            ['name' => 'Praja Teknologi', 'sector' => 'Software & Digital', 'sort_order' => 5],
            ['name' => 'Bumi Retail', 'sector' => 'FMCG & Jaringan Retail', 'sort_order' => 6],
            ['name' => 'Adidaya Manufaktur', 'sector' => 'Manufaktur Presisi', 'sort_order' => 7],
            ['name' => 'Kencana Properti', 'sector' => 'Real Estate & Konstruksi', 'sort_order' => 8],
        ];

        foreach ($clients as $cl) {
            Client::updateOrCreate(['name' => $cl['name']], $cl);
        }

        // 6. Case Studies
        $caseStudies = [
            [
                'title' => 'Restrukturisasi & Job Grading Holding Energi Nasional',
                'metric' => '4.200+',
                'metric_label' => 'Posisi distandardisasi',
                'result' => 'Menyelaraskan struktur 6 anak perusahaan menjadi 1 matriks grading seragam tanpa perselisihan industrial dalam 8 bulan.',
                'sort_order' => 1,
            ],
            [
                'title' => 'Executive Search & C-Suite Pipeline Konglomerasi Teknologi',
                'metric' => '94%',
                'metric_label' => 'Kandidat lolos masa percobaan',
                'result' => 'Menempatkan 14 posisi kepemimpinan strategis (CTO, CPO, VP Engineering) dengan rata-rata waktu pemenuhan 42 hari.',
                'sort_order' => 2,
            ],
            [
                'title' => 'Transformasi People Analytics Perbankan Komersial',
                'metric' => '24%',
                'metric_label' => 'Penurunan turnover sukarela',
                'result' => 'Membangun model prediktif retensi dan sistem manajemen kinerja berbasis OKR untuk 1.800+ staf operasional.',
                'sort_order' => 3,
            ],
        ];

        foreach ($caseStudies as $cs) {
            CaseStudy::updateOrCreate(['title' => $cs['title']], $cs);
        }

        // 7. FAQs
        $faqs = [
            [
                'question' => 'Bagaimana proses awal setelah kami mengirim formulir ini?',
                'answer' => 'Partner Senior kami akan meninjau kebutuhan Anda dan menghubungi kembali dalam 1x24 jam kerja untuk menjadwalkan sesi discovery meeting 30 menit via video call atau tatap muka.',
                'sort_order' => 1,
            ],
            [
                'question' => 'Apakah kami dapat menandatangani NDA sebelum diskusi detail?',
                'answer' => 'Tentu. Kami sangat menghormati kerahasiaan bisnis Anda. Kami dapat menandatangani Non-Disclosure Agreement (NDA) dari pihak Anda sebelum sesi pendalaman dilakukan.',
                'sort_order' => 2,
            ],
            [
                'question' => 'Berapa lama estimasi pengerjaan suatu proyek konsultasi?',
                'answer' => 'Durasi penugasan disesuaikan dengan ruang lingkup: 2-4 minggu untuk asesmen/audit awal, 6-10 minggu untuk perancangan job grading/remunerasi, hingga 6-12 bulan untuk transformasi organisasi menyeluruh.',
                'sort_order' => 3,
            ],
            [
                'question' => 'Apakah layanan Athera Nexus mencakup wilayah di luar Jabodetabek?',
                'answer' => 'Ya. Kami mendampingi klien di seluruh wilayah Indonesia (Sumatera, Kalimantan, Sulawesi, Jawa, Bali, hingga Papua) serta regional Asia Tenggara, baik melalui metode on-site maupun hybrid.',
                'sort_order' => 4,
            ],
        ];

        foreach ($faqs as $fq) {
            Faq::updateOrCreate(['question' => $fq['question']], $fq);
        }

        // 8. Sample Inquiry
        Inquiry::updateOrCreate(
            ['email' => 'hendra@kencanaproperti.co.id'],
            [
                'name' => 'Hendra Wijaya',
                'company' => 'PT Kencana Properti Persada',
                'service' => 'Konsultasi Strategi HR & Desain Organisasi',
                'message' => 'Kami berencana melakukan restrukturisasi organisasi holding dan menyusun job grading baru untuk 5 anak usaha di tahun 2026. Mohon informasi sesi diskusi awal.',
                'status' => 'unread',
            ]
        );
    }
}
