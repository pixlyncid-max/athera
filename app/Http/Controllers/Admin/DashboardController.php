<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Inquiry;
use App\Models\Service;
use App\Models\Client;
use App\Models\Faq;
use App\Models\Stat;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_inquiries' => Inquiry::count(),
            'unread_inquiries' => Inquiry::where('status', 'unread')->count(),
            'total_services' => Service::count(),
            'active_services' => Service::where('is_active', true)->count(),
            'total_clients' => Client::count(),
            'total_faqs' => Faq::count(),
        ];

        $recentInquiries = Inquiry::latest()->take(6)->get();

        return Inertia::render('Admin/Dashboard', [
            'metrics' => $stats,
            'recentInquiries' => $recentInquiries,
        ]);
    }
}
