<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Inquiry;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InquiryController extends Controller
{
    public function index(Request $request)
    {
        $query = Inquiry::latest();

        if ($request->has('status') && in_array($request->status, ['unread', 'read', 'replied'])) {
            $query->where('status', $request->status);
        }

        $inquiries = $query->paginate(15)->withQueryString();

        return Inertia::render('Admin/Inquiries/Index', [
            'inquiries' => $inquiries,
            'currentStatus' => $request->status ?? 'all',
            'counts' => [
                'all' => Inquiry::count(),
                'unread' => Inquiry::where('status', 'unread')->count(),
                'read' => Inquiry::where('status', 'read')->count(),
                'replied' => Inquiry::where('status', 'replied')->count(),
            ],
        ]);
    }

    public function updateStatus(Request $request, Inquiry $inquiry)
    {
        $validated = $request->validate([
            'status' => 'required|in:unread,read,replied',
            'notes' => 'nullable|string',
        ]);

        $inquiry->update($validated);

        return redirect()->back()->with('success', 'Status pesan berhasil diperbarui.');
    }

    public function destroy(Inquiry $inquiry)
    {
        $inquiry->delete();
        return redirect()->back()->with('success', 'Pesan berhasil dihapus.');
    }
}
