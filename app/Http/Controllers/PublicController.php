<?php

namespace App\Http\Controllers;

use App\Models\SiteSetting;
use App\Models\Service;
use App\Models\Stat;
use App\Models\Client;
use App\Models\CaseStudy;
use App\Models\Faq;
use App\Models\Inquiry;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicController extends Controller
{
    private function getAllSettings()
    {
        return SiteSetting::all()->pluck('value', 'key')->toArray();
    }

    public function home()
    {
        return Inertia::render('Welcome', [
            'services' => Service::where('is_active', true)->orderBy('sort_order')->get(),
            'stats' => Stat::where('is_active', true)->orderBy('sort_order')->get(),
            'clients' => Client::where('is_active', true)->orderBy('sort_order')->get(),
            'settings' => $this->getAllSettings(),
        ]);
    }

    public function services()
    {
        return Inertia::render('Services', [
            'services' => Service::where('is_active', true)->orderBy('sort_order')->get(),
            'settings' => $this->getAllSettings(),
        ]);
    }

    public function trust()
    {
        return Inertia::render('Trust', [
            'stats' => Stat::where('is_active', true)->orderBy('sort_order')->get(),
            'clients' => Client::where('is_active', true)->orderBy('sort_order')->get(),
            'caseStudies' => CaseStudy::where('is_active', true)->orderBy('sort_order')->get(),
            'settings' => $this->getAllSettings(),
        ]);
    }

    public function contact()
    {
        return Inertia::render('Contact', [
            'faqs' => Faq::where('is_active', true)->orderBy('sort_order')->get(),
            'servicesOptions' => Service::where('is_active', true)->orderBy('sort_order')->pluck('title'),
            'settings' => $this->getAllSettings(),
        ]);
    }

    public function submitContact(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|min:2|max:255',
            'email' => 'required|email|max:255',
            'company' => 'nullable|string|max:255',
            'service' => 'nullable|string|max:255',
            'message' => 'required|string|min:10|max:3000',
        ]);

        $inquiry = Inquiry::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'company' => $validated['company'] ?? null,
            'service' => $validated['service'] ?? null,
            'message' => $validated['message'],
            'status' => 'unread',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Pesan terkirim. Tim kami akan menghubungi Anda dalam 1x24 jam kerja.',
            'id' => $inquiry->id,
        ]);
    }
}
