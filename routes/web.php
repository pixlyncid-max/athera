<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\TrustController;
use App\Http\Controllers\Admin\FaqController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\InquiryController;
use App\Http\Controllers\Admin\PageContentController;
use Illuminate\Support\Facades\Route;

// --- Public Website Routes ---
Route::get('/', [PublicController::class, 'home'])->name('home');
Route::get('/layanan', [PublicController::class, 'services'])->name('services');
Route::get('/kepercayaan', [PublicController::class, 'trust'])->name('trust');
Route::get('/kontak', [PublicController::class, 'contact'])->name('contact');
Route::post('/api/contact', [PublicController::class, 'submitContact'])->name('contact.submit');

// --- Admin CMS Routes (Protected by Auth) ---
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Page Content CMS (Individual Pages)
    Route::prefix('pages')->name('pages.')->group(function () {
        Route::get('/home', [PageContentController::class, 'home'])->name('home');
        Route::post('/home', [PageContentController::class, 'updateHome'])->name('home.update');

        Route::get('/services', [PageContentController::class, 'services'])->name('services');
        Route::post('/services', [PageContentController::class, 'updateServices'])->name('services.update');

        Route::get('/about', [PageContentController::class, 'about'])->name('about');
        Route::post('/about', [PageContentController::class, 'updateAbout'])->name('about.update');

        Route::get('/contact', [PageContentController::class, 'contact'])->name('contact');
        Route::post('/contact', [PageContentController::class, 'updateContact'])->name('contact.update');
    });

    // Services Management (Katalog Layanan)
    Route::get('/services', function () {
        return redirect()->route('admin.pages.services');
    })->name('services.index');
    Route::post('/services', [ServiceController::class, 'store'])->name('services.store');
    Route::put('/services/{service}', [ServiceController::class, 'update'])->name('services.update');
    Route::patch('/services/{service}/toggle', [ServiceController::class, 'toggleActive'])->name('services.toggle');
    Route::delete('/services/{service}', [ServiceController::class, 'destroy'])->name('services.destroy');

    // Trust & Portfolio Management (Stats, Clients, Case Studies)
    Route::get('/trust', function () {
        return redirect()->route('admin.pages.about');
    })->name('trust.index');
    Route::post('/trust/stats', [TrustController::class, 'storeStat'])->name('trust.stats.store');
    Route::put('/trust/stats/{stat}', [TrustController::class, 'updateStat'])->name('trust.stats.update');
    Route::delete('/trust/stats/{stat}', [TrustController::class, 'destroyStat'])->name('trust.stats.destroy');

    Route::post('/trust/clients', [TrustController::class, 'storeClient'])->name('trust.clients.store');
    Route::put('/trust/clients/{client}', [TrustController::class, 'updateClient'])->name('trust.clients.update');
    Route::delete('/trust/clients/{client}', [TrustController::class, 'destroyClient'])->name('trust.clients.destroy');

    Route::post('/trust/case-studies', [TrustController::class, 'storeCaseStudy'])->name('trust.case-studies.store');
    Route::put('/trust/case-studies/{caseStudy}', [TrustController::class, 'updateCaseStudy'])->name('trust.case-studies.update');
    Route::delete('/trust/case-studies/{caseStudy}', [TrustController::class, 'destroyCaseStudy'])->name('trust.case-studies.destroy');

    // FAQs Management (Tanya Jawab)
    Route::get('/faqs', function () {
        return redirect()->route('admin.pages.contact');
    })->name('faqs.index');
    Route::post('/faqs', [FaqController::class, 'store'])->name('faqs.store');
    Route::put('/faqs/{faq}', [FaqController::class, 'update'])->name('faqs.update');
    Route::delete('/faqs/{faq}', [FaqController::class, 'destroy'])->name('faqs.destroy');

    // Inquiries / Inbox Management
    Route::get('/inquiries', [InquiryController::class, 'index'])->name('inquiries.index');
    Route::patch('/inquiries/{inquiry}/status', [InquiryController::class, 'updateStatus'])->name('inquiries.status');
    Route::delete('/inquiries/{inquiry}', [InquiryController::class, 'destroy'])->name('inquiries.destroy');

    // Website & Hero Settings Management
    Route::get('/settings', [SettingController::class, 'index'])->name('settings.index');
    Route::post('/settings', [SettingController::class, 'update'])->name('settings.update');
});

// Alias /dashboard to /admin/dashboard
Route::get('/dashboard', function () {
    return redirect()->route('admin.dashboard');
})->middleware(['auth'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

