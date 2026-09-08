<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageContentController extends Controller
{
    private function saveSettings(array $data, string $group)
    {
        foreach ($data as $key => $value) {
            SiteSetting::set($key, $value, $group);
        }
    }

    private function getSettings()
    {
        return SiteSetting::all()->pluck('value', 'key')->toArray();
    }

    // --- 1. Beranda (Home) ---
    public function home()
    {
        return Inertia::render('Admin/Pages/Home', [
            'settings' => $this->getSettings(),
        ]);
    }

    public function updateHome(Request $request)
    {
        $data = $request->except(['_token', '_method']);
        $this->saveSettings($data, 'page_home');
        return redirect()->back()->with('success', 'Konten halaman Beranda berhasil disimpan.');
    }

    // --- 2. Layanan (Services) ---
    public function services()
    {
        return Inertia::render('Admin/Pages/Services', [
            'settings' => $this->getSettings(),
            'services' => \App\Models\Service::orderBy('sort_order')->get(),
        ]);
    }

    public function updateServices(Request $request)
    {
        $data = $request->except(['_token', '_method']);
        $this->saveSettings($data, 'page_services');
        return redirect()->back()->with('success', 'Konten halaman Layanan berhasil disimpan.');
    }

    // --- 3. Tentang Kami (About & Trust) ---
    public function about()
    {
        return Inertia::render('Admin/Pages/About', [
            'settings' => $this->getSettings(),
            'stats' => \App\Models\Stat::orderBy('sort_order')->get(),
            'clients' => \App\Models\Client::orderBy('sort_order')->get(),
            'caseStudies' => \App\Models\CaseStudy::orderBy('sort_order')->get(),
        ]);
    }

    public function updateAbout(Request $request)
    {
        $data = $request->except(['_token', '_method']);
        $this->saveSettings($data, 'page_about');
        return redirect()->back()->with('success', 'Konten halaman Tentang Kami berhasil disimpan.');
    }

    // --- 4. Kontak (Contact & FAQs) ---
    public function contact()
    {
        return Inertia::render('Admin/Pages/Contact', [
            'settings' => $this->getSettings(),
            'faqs' => \App\Models\Faq::orderBy('sort_order')->get(),
        ]);
    }

    public function updateContact(Request $request)
    {
        $data = $request->except(['_token', '_method']);
        $this->saveSettings($data, 'page_contact');
        return redirect()->back()->with('success', 'Konten halaman Kontak berhasil disimpan.');
    }
}
