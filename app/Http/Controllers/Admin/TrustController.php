<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Stat;
use App\Models\Client;
use App\Models\CaseStudy;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TrustController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Trust/Index', [
            'stats' => Stat::orderBy('sort_order')->get(),
            'clients' => Client::orderBy('sort_order')->get(),
            'caseStudies' => CaseStudy::orderBy('sort_order')->get(),
        ]);
    }

    // --- Stats Methods ---
    public function storeStat(Request $request)
    {
        $validated = $request->validate([
            'label' => 'required|string|max:255',
            'value' => 'required|integer',
            'suffix' => 'nullable|string|max:10',
            'description' => 'nullable|string',
            'sort_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        Stat::create($validated);
        return redirect()->back()->with('success', 'Data statistik berhasil ditambahkan.');
    }

    public function updateStat(Request $request, Stat $stat)
    {
        $validated = $request->validate([
            'label' => 'required|string|max:255',
            'value' => 'required|integer',
            'suffix' => 'nullable|string|max:10',
            'description' => 'nullable|string',
            'sort_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        $stat->update($validated);
        return redirect()->back()->with('success', 'Data statistik berhasil diperbarui.');
    }

    public function destroyStat(Stat $stat)
    {
        $stat->delete();
        return redirect()->back()->with('success', 'Data statistik berhasil dihapus.');
    }

    // --- Clients Methods ---
    public function storeClient(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'sector' => 'nullable|string|max:255',
            'sort_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        Client::create($validated);
        return redirect()->back()->with('success', 'Mitra klien berhasil ditambahkan.');
    }

    public function updateClient(Request $request, Client $client)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'sector' => 'nullable|string|max:255',
            'sort_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        $client->update($validated);
        return redirect()->back()->with('success', 'Mitra klien berhasil diperbarui.');
    }

    public function destroyClient(Client $client)
    {
        $client->delete();
        return redirect()->back()->with('success', 'Mitra klien berhasil dihapus.');
    }

    // --- Case Studies Methods ---
    public function storeCaseStudy(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'metric' => 'required|string|max:50',
            'metric_label' => 'required|string|max:100',
            'result' => 'required|string',
            'sort_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        CaseStudy::create($validated);
        return redirect()->back()->with('success', 'Studi kasus berhasil ditambahkan.');
    }

    public function updateCaseStudy(Request $request, CaseStudy $caseStudy)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'metric' => 'required|string|max:50',
            'metric_label' => 'required|string|max:100',
            'result' => 'required|string',
            'sort_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        $caseStudy->update($validated);
        return redirect()->back()->with('success', 'Studi kasus berhasil diperbarui.');
    }

    public function destroyCaseStudy(CaseStudy $caseStudy)
    {
        $caseStudy->delete();
        return redirect()->back()->with('success', 'Studi kasus berhasil dihapus.');
    }
}
