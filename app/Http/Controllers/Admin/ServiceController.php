<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::orderBy('sort_order')->get();
        return Inertia::render('Admin/Services/Index', [
            'services' => $services,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'badge' => 'nullable|string|max:100',
            'icon' => 'nullable|string|max:50',
            'description' => 'required|string',
            'deliverables' => 'nullable|array',
            'deliverables.*' => 'string|max:255',
            'impact' => 'nullable|string|max:255',
            'sort_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        Service::create([
            'title' => $validated['title'],
            'badge' => $validated['badge'] ?? null,
            'icon' => $validated['icon'] ?? 'Compass',
            'description' => $validated['description'],
            'deliverables' => $validated['deliverables'] ?? [],
            'impact' => $validated['impact'] ?? null,
            'sort_order' => $validated['sort_order'] ?? Service::count() + 1,
            'is_active' => $validated['is_active'] ?? true,
        ]);

        return redirect()->back()->with('success', 'Layanan baru berhasil ditambahkan.');
    }

    public function update(Request $request, Service $service)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'badge' => 'nullable|string|max:100',
            'icon' => 'nullable|string|max:50',
            'description' => 'required|string',
            'deliverables' => 'nullable|array',
            'deliverables.*' => 'string|max:255',
            'impact' => 'nullable|string|max:255',
            'sort_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        $service->update($validated);

        return redirect()->back()->with('success', 'Layanan berhasil diperbarui.');
    }

    public function toggleActive(Service $service)
    {
        $service->update(['is_active' => !$service->is_active]);
        return redirect()->back()->with('success', 'Status layanan berhasil diubah.');
    }

    public function destroy(Service $service)
    {
        $service->delete();
        return redirect()->back()->with('success', 'Layanan berhasil dihapus.');
    }
}
