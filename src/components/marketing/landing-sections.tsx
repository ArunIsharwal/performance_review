'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Target,
  MessageSquareQuote,
  Clock,
  ArrowRight,
  TrendingUp,
  ChevronDown,
  Lock,
  ChevronRight,
  Calculator,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function MarketingNavbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#F7F7F2]/95 backdrop-blur-md border-b border-[#E6E8E1] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-[#17251F] text-[#C8ED78] flex items-center justify-center font-bold text-base shadow-sm group-hover:scale-105 transition-transform ring-2 ring-[#C8ED78]/30">
            RF
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-[#17251F] tracking-tight leading-none">
              Review<span className="text-[#5876D8]">Forge</span>
            </span>
            <span className="text-[10px] text-[#747D75] font-semibold tracking-wider mt-0.5">
              ENTERPRISE 360° SYNTHESIZER
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-[#747D75]">
          <a href="#problem" className="hover:text-[#17251F] transition-colors">
            The Problem
          </a>
          <a href="#solution" className="hover:text-[#17251F] transition-colors">
            Solution Architecture
          </a>
          <a href="#features" className="hover:text-[#17251F] transition-colors">
            Platform Modules
          </a>
          <a href="#how-it-works" className="hover:text-[#17251F] transition-colors">
            Governance Flow
          </a>
          <a href="#pricing" className="hover:text-[#17251F] transition-colors">
            Pricing
          </a>
          <a href="#faq" className="hover:text-[#17251F] transition-colors">
            FAQ
          </a>
        </nav>

        {/* Action CTAs */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="secondary" size="sm" className="hidden sm:inline-flex">
              Sign In
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button
              variant="accent"
              size="sm"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              className="font-bold shadow-md hover:shadow-lg"
            >
              Open Live Workspace
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export function HeroSection() {
  const [activeCitation, setActiveCitation] = useState<'q2_okr' | 'incident' | 'mentorship'>('q2_okr');

  return (
    <section className="relative pt-16 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#C8ED78]/15 via-[#5876D8]/10 to-[#17251F]/10 blur-3xl pointer-events-none rounded-full" />

      {/* Editorial Pill */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E6E8E1] shadow-xs mb-6 relative z-10 animate-in fade-in slide-in-from-top-3">
        <span className="w-2 h-2 rounded-full bg-[#2C5E1A] animate-pulse" />
        <span className="text-xs font-bold text-[#17251F] uppercase tracking-wider">
          Editorial Enterprise Intelligence
        </span>
        <span className="text-xs text-[#747D75]">
          • Evidence-First 360° Review Engine
        </span>
      </div>

      {/* Main Headline */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#17251F] max-w-4xl mx-auto leading-[1.12] relative z-10">
        Performance reviews built on{' '}
        <span className="relative inline-block text-[#17251F]">
          <span className="relative z-10">evidence</span>
          <span className="absolute bottom-1 left-0 right-0 h-3 bg-[#C8ED78] -z-0 rounded-xs transform -rotate-1" />
        </span>
        , not guesswork.
      </h1>

      {/* Subtitle */}
      <p className="mt-6 text-base sm:text-lg text-[#747D75] max-w-2xl mx-auto leading-relaxed font-normal relative z-10">
        Bring peer feedback, quarterly OKRs, employee reflections, and manager insights
        together to create clearer, more constructive annual performance reviews.
      </p>

      {/* CTA Buttons */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4 relative z-10">
        <Link href="/dashboard">
          <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4 text-[#C8ED78]" />} className="shadow-lg hover:shadow-xl">
            Explore the Platform Demo
          </Button>
        </Link>
        <Link href="/ai-review-studio">
          <Button
            variant="secondary"
            size="lg"
            leftIcon={<Sparkles className="w-4 h-4 text-[#5876D8]" />}
            className="shadow-xs hover:border-[#CADACD]"
          >
            Launch AI Review Studio
          </Button>
        </Link>
      </div>

      {/* Trust Metrics Bar */}
      <div className="mt-12 max-w-3xl mx-auto grid grid-cols-3 gap-4 border-y border-[#E6E8E1] py-4 text-left relative z-10">
        <div>
          <div className="text-xl sm:text-2xl font-black text-[#17251F]">75%</div>
          <div className="text-[11px] text-[#747D75] font-medium">Reduction in review drafting hours</div>
        </div>
        <div>
          <div className="text-xl sm:text-2xl font-black text-[#2C5E1A]">100%</div>
          <div className="text-[11px] text-[#747D75] font-medium">Empirical traceability for claims</div>
        </div>
        <div>
          <div className="text-xl sm:text-2xl font-black text-[#5876D8]">0</div>
          <div className="text-[11px] text-[#747D75] font-medium">Fabricated achievements or LLM hallucinations</div>
        </div>
      </div>

      {/* REALISTIC HIGH-FIDELITY PRODUCT PREVIEW COMPOSITION */}
      <div className="mt-14 relative max-w-5xl mx-auto bg-[#FFFFFF] border border-[#E6E8E1] rounded-2xl shadow-2xl overflow-hidden text-left relative z-10">
        {/* Mock Browser Title Bar */}
        <div className="px-4 py-3 bg-[#FAFBF8] border-b border-[#E6E8E1] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#E57373]" />
            <div className="w-3 h-3 rounded-full bg-[#FFB74D]" />
            <div className="w-3 h-3 rounded-full bg-[#81C784]" />
            <span className="ml-3 text-xs text-[#747D75] font-mono font-medium">
              https://reviewforge.enterprise/ai-review-studio?employee=RF-1002
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#EEF9D1] text-[#2C5E1A] border border-[#D6EFA0]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2C5E1A]" />
              Evidence Verified: 94% Coverage
            </span>
          </div>
        </div>

        {/* 3-Panel Preview UI */}
        <div className="grid grid-cols-1 md:grid-cols-12 bg-[#FFFFFF]">
          {/* Panel 1: Left Evidence Sources (4 cols) */}
          <div className="md:col-span-4 p-5 border-r border-[#E6E8E1] bg-[#FAFBF8] space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-[#E6E8E1]">
              <div className="w-11 h-11 rounded-xl bg-[#17251F] text-[#C8ED78] flex items-center justify-center font-extrabold text-sm shadow-xs ring-2 ring-[#C8ED78]/40">
                RD
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#17251F]">Rahul Deshmukh</h4>
                <p className="text-[11px] text-[#747D75]">Staff Backend Architect</p>
                <span className="text-[10px] font-mono text-[#5876D8]">ID: RF-1002 • Eng & Infra</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold text-[#747D75] uppercase tracking-wider">
                Active Evidence Records
              </span>

              <div
                onClick={() => setActiveCitation('q2_okr')}
                className={`p-2.5 rounded-xl border text-xs transition-all cursor-pointer ${
                  activeCitation === 'q2_okr'
                    ? 'bg-[#FFFFFF] border-[#17251F] shadow-xs'
                    : 'bg-[#FFFFFF] border-[#E6E8E1] hover:border-[#CADACD]'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-[#17251F]">
                  <span className="flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-[#D97706]" />
                    Q2 OKR: API Latency Cut
                  </span>
                  <span className="text-[#2C5E1A] font-mono text-[11px]">31.5%</span>
                </div>
                <p className="text-[11px] text-[#747D75] mt-1">
                  Target: 30% reduction. Actual: 31.5% achieved across core endpoints.
                </p>
              </div>

              <div
                onClick={() => setActiveCitation('incident')}
                className={`p-2.5 rounded-xl border text-xs transition-all cursor-pointer ${
                  activeCitation === 'incident'
                    ? 'bg-[#FFFFFF] border-[#17251F] shadow-xs'
                    : 'bg-[#FFFFFF] border-[#E6E8E1] hover:border-[#CADACD]'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-[#17251F]">
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-[#17251F]" />
                    Manager Note: AWS Failover
                  </span>
                  <span className="text-[10px] bg-[#FEF6E7] text-[#92540D] px-1.5 py-0.2 rounded font-mono">
                    8 Min
                  </span>
                </div>
                <p className="text-[11px] text-[#747D75] mt-1">
                  Resolved pool leak during unannounced AWS AZ degradation with zero data loss.
                </p>
              </div>

              <div
                onClick={() => setActiveCitation('mentorship')}
                className={`p-2.5 rounded-xl border text-xs transition-all cursor-pointer ${
                  activeCitation === 'mentorship'
                    ? 'bg-[#FFFFFF] border-[#17251F] shadow-xs'
                    : 'bg-[#FFFFFF] border-[#E6E8E1] hover:border-[#CADACD]'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-[#17251F]">
                  <span className="flex items-center gap-1.5">
                    <MessageSquareQuote className="w-3.5 h-3.5 text-[#5876D8]" />
                    360 Feedback: Mentorship
                  </span>
                  <span className="text-[#17251F] font-mono text-[11px]">5.0/5</span>
                </div>
                <p className="text-[11px] text-[#747D75] mt-1">
                  Reviewed 60+ pull requests for junior squad members with line-by-line feedback.
                </p>
              </div>
            </div>
          </div>

          {/* Panel 2 & 3: Review Workspace & Live Citation Inspector (8 cols) */}
          <div className="md:col-span-8 p-6 space-y-5">
            {/* Review Header Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E6E8E1]">
              <div>
                <span className="text-[10px] font-bold text-[#5876D8] uppercase tracking-wider">
                  Document Synthesizer Output
                </span>
                <h3 className="text-sm font-bold text-[#17251F]">
                  FY2026 Comprehensive Annual 360° Review
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#747D75]">Rating:</span>
                <span className="px-2.5 py-1 rounded-lg bg-[#17251F] text-[#C8ED78] font-bold text-xs">
                  4.8 / 5.0
                </span>
              </div>
            </div>

            {/* Generated Section with Interactive Citation Pill */}
            <div className="p-4 rounded-xl bg-[#FAFBF8] border border-[#E6E8E1] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#17251F]">
                  Section 2: Major Achievements
                </span>
                <span className="text-[10px] text-[#2C5E1A] font-semibold bg-[#EEF9D1] px-2 py-0.5 rounded-full border border-[#D6EFA0]">
                  3 Citations Linked
                </span>
              </div>

              <p className="text-xs text-[#202820] leading-relaxed">
                Rahul improved API performance by{' '}
                <button
                  onClick={() => setActiveCitation('q2_okr')}
                  className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-bold text-[#17251F] bg-[#EEF9D1] border border-[#C8ED78] hover:bg-[#D6EFA0] transition-colors cursor-pointer"
                >
                  31.5% during the review period
                  <span className="text-[9px] bg-[#17251F] text-white px-1 py-0.2 rounded font-mono">
                    Q2 OKR
                  </span>
                </button>
                , exceeding the annual 30% latency benchmark. He also resolved an unannounced AWS failover in{' '}
                <button
                  onClick={() => setActiveCitation('incident')}
                  className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-bold text-[#17251F] bg-[#FEF6E7] border border-[#FBDCA8] hover:bg-[#FDE7C7] transition-colors cursor-pointer"
                >
                  8 minutes with zero data loss
                  <span className="text-[9px] bg-[#92540D] text-white px-1 py-0.2 rounded font-mono">
                    Manager Note
                  </span>
                </button>
                , and conducted over{' '}
                <button
                  onClick={() => setActiveCitation('mentorship')}
                  className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-bold text-[#17251F] bg-[#EEF2FC] border border-[#D3DDF6] hover:bg-[#DCE5FA] transition-colors cursor-pointer"
                >
                  60 architectural code reviews
                  <span className="text-[9px] bg-[#344E9E] text-white px-1 py-0.2 rounded font-mono">
                    360 Peer
                  </span>
                </button>
                {' '}for junior engineers.
              </p>
            </div>

            {/* Dynamic Evidence Inspector Popover */}
            <div className="p-3.5 bg-[#FFFFFF] border-2 border-[#17251F] rounded-xl shadow-md space-y-2 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between text-xs font-bold text-[#17251F] pb-1.5 border-b border-[#E6E8E1]">
                <span className="flex items-center gap-1.5 text-[#5876D8]">
                  {activeCitation === 'q2_okr' && <Target className="w-4 h-4 text-[#D97706]" />}
                  {activeCitation === 'incident' && <Lock className="w-4 h-4 text-[#17251F]" />}
                  {activeCitation === 'mentorship' && <MessageSquareQuote className="w-4 h-4 text-[#5876D8]" />}
                  Evidence Inspector: {activeCitation === 'q2_okr' ? 'Q2 OKR Key Result 3' : activeCitation === 'incident' ? 'Manager Incident Post-Mortem' : 'Peer Mentorship Rubric'}
                </span>
                <span className="text-[11px] text-[#747D75] font-mono">
                  {activeCitation === 'q2_okr' ? 'June 2026' : activeCitation === 'incident' ? 'June 2026' : 'October 2026'}
                </span>
              </div>

              <div className="text-xs text-[#202820]">
                {activeCitation === 'q2_okr' && (
                  <p>
                    <strong>Source Record:</strong> GraphQL & REST gateway optimization. Target: 30% reduction. Actual: 31.5% reduction. Redis caching hit ratio reached 89.4%.
                  </p>
                )}
                {activeCitation === 'incident' && (
                  <p>
                    <strong>Source Record:</strong> Observed connection pool leak within 8 mins of AWS degradation in us-east-1 and executed failover with zero customer impact.
                  </p>
                )}
                {activeCitation === 'mentorship' && (
                  <p>
                    <strong>Source Record:</strong> Peer feedback from Liam Chen: &quot;Reviewed 60+ pull requests with constructive guidance, teaching database indexing and concurrency.&quot;
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between pt-1 text-[11px] text-[#747D75]">
                <span>Status: <strong className="text-[#2C5E1A]">Verified Empirical Claim</strong></span>
                <span className="font-mono text-[#5876D8]">Trace ID: EV-2026-904</span>
              </div>
            </div>

            {/* Bottom action row */}
            <div className="flex items-center justify-between pt-1 text-xs">
              <span className="text-[#747D75]">
                Human-in-the-loop: Evaluating manager sign-off mandatory.
              </span>
              <Link href="/ai-review-studio">
                <Button size="sm" variant="accent" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Open Full Studio Workspace
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProblemSection() {
  const problems = [
    {
      title: 'Scattered Performance Data',
      desc: 'Accomplishments are fragmented across Jira tickets, GitHub PRs, Slack conversations, and stale spreadsheets. Half the work is forgotten.',
      stat: '64%',
      statLabel: 'of managers cite data fragmentation as their biggest pain point'
    },
    {
      title: 'Recency Bias Distorts Ratings',
      desc: 'Managers evaluate the last 4 weeks of output instead of measuring the full 12 months of annual contribution.',
      stat: '3.8x',
      statLabel: 'more weight unintentionally given to Q4 projects'
    },
    {
      title: 'Time-Consuming Manual Writing',
      desc: 'Managers spend 5+ hours per employee trying to write diplomatic, grammatically sound performance narratives.',
      stat: '210 hrs',
      statLabel: 'spent each cycle per 40-person department'
    },
    {
      title: 'Inconsistent Assessments Across Teams',
      desc: 'Different managers use wildly divergent evaluation criteria, leading to calibration disagreements and employee distrust.',
      stat: '42%',
      statLabel: 'variance in evaluation standards across teams'
    },
    {
      title: 'Missing Infrastructure Contributions',
      desc: 'Quiet high-performers who deliver crucial backend resilience or bug fixes get overlooked during promotion cycles.',
      stat: '1 in 3',
      statLabel: 'infrastructure contributions go undocumented'
    }
  ];

  return (
    <section id="problem" className="py-20 bg-[#FFFFFF] border-y border-[#E6E8E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <Badge variant="rose" dot>
            The Annual Review Breakdown
          </Badge>
          <h2 className="mt-3 text-3xl font-extrabold text-[#17251F] tracking-tight sm:text-4xl">
            Why traditional annual reviews fail both companies and employees.
          </h2>
          <p className="mt-4 text-base text-[#747D75] leading-relaxed">
            Most organizations still evaluate talent using subjective recollections
            and panicked last-minute drafting sessions. ReviewForge replaces guesswork
            with structured, traceable evidence.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((p, idx) => (
            <div
              key={p.title}
              className={`p-6 rounded-2xl border border-[#E6E8E1] bg-[#FAFBF8] flex flex-col justify-between hover:border-[#D0D4CA] transition-all ${
                idx === 0 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div>
                <div className="text-3xl font-black text-[#17251F] tracking-tight mb-2">
                  {p.stat}
                </div>
                <div className="text-[11px] font-bold text-[#747D75] uppercase tracking-wider mb-4">
                  {p.statLabel}
                </div>
                <h3 className="text-base font-bold text-[#17251F]">{p.title}</h3>
                <p className="mt-2 text-xs text-[#747D75] leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SolutionSection() {
  return (
    <section id="solution" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <Badge variant="sage" dot>
            The ReviewForge Solution
          </Badge>
          <h2 className="text-3xl font-extrabold text-[#17251F] tracking-tight sm:text-4xl leading-tight">
            One unified intelligence engine connecting every piece of employee performance.
          </h2>
          <p className="text-base text-[#747D75] leading-relaxed">
            ReviewForge continuously pulls together objective OKR metrics, 360 peer
            ratings, private manager observations, and self-reflections. When it’s time
            for annual reviews, our synthesis engine generates a balanced, evidence-backed
            draft in seconds.
          </p>

          <div className="space-y-3.5 pt-2">
            {[
              '100% Traceable Evidence: Every statement links back to source OKRs or feedback.',
              'Human-in-the-Loop Governance: Managers inspect, calibrate, and approve every word.',
              'Zero Hallucinations: Does not fabricate accomplishments not present in data.',
              'Anonymity Protection: Keeps peer reviewer identities confidential in employee views.'
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#2C5E1A] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-medium text-[#202820]">
                  {text}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <Link href="/dashboard">
              <Button variant="primary" size="md">
                Try the Live Workspace
              </Button>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6 bg-[#FFFFFF] border border-[#E6E8E1] rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E6E8E1]">
            <span className="text-xs font-bold text-[#17251F] uppercase tracking-wider">
              Evidence Architecture
            </span>
            <Badge variant="forest">ReviewForge Core</Badge>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-[#FAFBF8] rounded-xl border border-[#E6E8E1] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Target className="w-4 h-4 text-[#D97706]" />
                <div>
                  <div className="font-semibold text-[#17251F]">Quarterly OKRs</div>
                  <div className="text-[11px] text-[#747D75]">Q1–Q4 quantitative milestones</div>
                </div>
              </div>
              <span className="text-[10px] font-bold text-[#2C5E1A] bg-[#EEF9D1] px-2 py-0.5 rounded">
                Objective
              </span>
            </div>

            <div className="p-3 bg-[#FAFBF8] rounded-xl border border-[#E6E8E1] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <MessageSquareQuote className="w-4 h-4 text-[#5876D8]" />
                <div>
                  <div className="font-semibold text-[#17251F]">360° Peer Feedback</div>
                  <div className="text-[11px] text-[#747D75]">Cross-functional ratings & comments</div>
                </div>
              </div>
              <span className="text-[10px] font-bold text-[#17251F] bg-[#DDE8DF] px-2 py-0.5 rounded">
                Multisource
              </span>
            </div>

            <div className="p-3 bg-[#FAFBF8] rounded-xl border border-[#E6E8E1] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Lock className="w-4 h-4 text-[#17251F]" />
                <div>
                  <div className="font-semibold text-[#17251F]">Manager Private Notes</div>
                  <div className="text-[11px] text-[#747D75]">Real-time incident & coaching journal</div>
                </div>
              </div>
              <span className="text-[10px] font-bold text-[#92540D] bg-[#FEF6E7] px-2 py-0.5 rounded">
                Confidential
              </span>
            </div>

            <div className="p-3 bg-[#FAFBF8] rounded-xl border border-[#E6E8E1] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-[#2C5E1A]" />
                <div>
                  <div className="font-semibold text-[#17251F]">Employee Self-Reflection</div>
                  <div className="text-[11px] text-[#747D75]">Personal perspective & career aspirations</div>
                </div>
              </div>
              <span className="text-[10px] font-bold text-[#5876D8] bg-[#EEF2FC] px-2 py-0.5 rounded">
                Employee-led
              </span>
            </div>
          </div>

          <div className="p-3.5 bg-[#17251F] text-white rounded-xl flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-[#C8ED78]">
                AI Review Studio Synthesizer
              </div>
              <div className="text-[10px] text-[#CADACD]">
                Generates balanced 8-section annual evaluation with citations.
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#C8ED78]" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function FeatureShowcase() {
  const features = [
    {
      icon: <MessageSquareQuote className="w-5 h-5 text-[#5876D8]" />,
      title: '360° Peer Feedback',
      desc: 'Collect multi-rater assessments across collaboration, problem-solving, and technical impact with robust anonymity safeguards.'
    },
    {
      icon: <Target className="w-5 h-5 text-[#D97706]" />,
      title: 'Quarterly OKR Tracking',
      desc: 'Seamlessly connect annual evaluations with tangible quarterly objectives and key results achieved throughout the year.'
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#17251F]" />,
      title: 'AI-Assisted Review Synthesis',
      desc: 'Transform scattered inputs into balanced 8-section review drafts in seconds, saving up to 75% of manager drafting hours.'
    },
    {
      icon: <FileText className="w-5 h-5 text-[#2C5E1A]" />,
      title: 'Evidence-Linked Statements',
      desc: 'Every paragraph contains clickable citations verifying the exact OKR, peer comment, or manager note backing the claim.'
    },
    {
      icon: <Clock className="w-5 h-5 text-[#5876D8]" />,
      title: 'Performance History Timeline',
      desc: 'Maintain a longitudinal archive of previous cycles, skill progressions, and promotion milestones across employee tenures.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#2C5E1A]" />,
      title: 'Manager Approval Workflows',
      desc: 'Ensure deliberate human sign-off with change-request capabilities before reviews are released by HR.'
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-[#D97706]" />,
      title: 'HR Analytics & Calibration',
      desc: 'Identify high-potential talent, department completion bottlenecks, and competency heatmaps across the entire company.'
    }
  ];

  return (
    <section id="features" className="py-20 bg-[#FFFFFF] border-y border-[#E6E8E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="forest">Comprehensive Enterprise Capabilities</Badge>
          <h2 className="mt-3 text-3xl font-extrabold text-[#17251F] tracking-tight sm:text-4xl">
            Everything your talent team needs for modern review cycles.
          </h2>
          <p className="mt-3 text-sm text-[#747D75]">
            Engineered for high-growth enterprises that demand accuracy, auditability, and speed.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(f => (
            <div
              key={f.title}
              className="p-6 rounded-2xl border border-[#E6E8E1] bg-[#FAFBF8] hover:border-[#D0D4CA] transition-all"
            >
              <div className="p-2.5 w-fit rounded-xl bg-[#FFFFFF] border border-[#E6E8E1] mb-4">
                {f.icon}
              </div>
              <h3 className="text-base font-bold text-[#17251F]">{f.title}</h3>
              <p className="mt-2 text-xs text-[#747D75] leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorksSection() {
  const steps = [
    {
      num: '01',
      title: 'Collect Information',
      desc: 'ReviewForge continuously aggregates quarterly OKRs, peer 360 evaluations, self-reflections, and manager notes.'
    },
    {
      num: '02',
      title: 'Analyze Performance Evidence',
      desc: 'The intelligence engine verifies empirical achievements, checks feedback consistency, and flags any data gaps.'
    },
    {
      num: '03',
      title: 'Generate Review Drafts',
      desc: 'A structured 8-section review is synthesized with inline evidence citations connecting claims to verifiable source records.'
    },
    {
      num: '04',
      title: 'Manager Edits & Approves',
      desc: 'The manager reviews the draft, adjusts phrasing, regenerates individual sections if desired, and signs off.'
    },
    {
      num: '05',
      title: 'HR Releases Final Review',
      desc: 'HR reviews department calibration metrics and securely releases the finalized performance review to the employee.'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <Badge variant="lime">5-Step Governance Framework</Badge>
        <h2 className="mt-3 text-3xl font-extrabold text-[#17251F] tracking-tight sm:text-4xl">
          From scattered notes to an approved review in minutes.
        </h2>
        <p className="mt-3 text-sm text-[#747D75]">
          A disciplined, step-by-step workflow designed to protect fairness and preserve executive oversight.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {steps.map(s => (
          <div
            key={s.num}
            className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E6E8E1] flex flex-col justify-between"
          >
            <div>
              <span className="text-2xl font-black text-[#17251F]/20 font-mono">
                {s.num}
              </span>
              <h3 className="text-sm font-bold text-[#17251F] mt-2 mb-2">
                {s.title}
              </h3>
              <p className="text-xs text-[#747D75] leading-relaxed">
                {s.desc}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E6E8E1] flex items-center gap-1.5 text-[10px] font-semibold text-[#5876D8]">
              <span>Step {s.num}</span>
              <ChevronRight className="w-3 h-3" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SecuritySection() {
  return (
    <section id="security" className="py-16 bg-[#17251F] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <Badge variant="lime" dot>
              Responsible AI & Enterprise Trust
            </Badge>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Engineered with privacy, confidentiality, and manager oversight by design.
            </h2>
            <p className="mt-4 text-sm text-[#CADACD] leading-relaxed max-w-2xl">
              We believe AI must never make unilateral promotion, compensation, or termination
              decisions. ReviewForge is built to assist human evaluation, not automate employment outcomes.
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <Lock className="w-5 h-5 text-[#C8ED78] mb-2" />
                <div className="text-xs font-bold text-white">Private Manager Notes</div>
                <div className="text-[11px] text-[#CADACD] mt-1">Never leaked to employee view.</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <ShieldCheck className="w-5 h-5 text-[#C8ED78] mb-2" />
                <div className="text-xs font-bold text-white">Strict Peer Anonymity</div>
                <div className="text-[11px] text-[#CADACD] mt-1">Provider identities masked in employee UI.</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <FileText className="w-5 h-5 text-[#C8ED78] mb-2" />
                <div className="text-xs font-bold text-white">Mandatory Human Signoff</div>
                <div className="text-[11px] text-[#CADACD] mt-1">No automatic release of AI drafts.</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 p-6 bg-white/5 border border-white/10 rounded-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-[#C8ED78] text-[#17251F] flex items-center justify-center font-bold mx-auto mb-3">
              RF
            </div>
            <div className="text-sm font-bold text-white">Enterprise Compliance Ready</div>
            <div className="text-xs text-[#CADACD] mt-1 mb-4">
              SOC2 Type II aligned architecture, GDPR multi-region data sovereignty, and full audit logging.
            </div>
            <Link href="/settings">
              <Button variant="accent" size="sm" className="w-full">
                Review Organization Security
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PricingSection() {
  const [employeeCount, setEmployeeCount] = useState(60);
  const costPerEmployee = 25;
  const annualInvestment = employeeCount * costPerEmployee;
  const estimatedHoursSaved = employeeCount * 4.5;
  const estimatedDollarSavings = Math.round(estimatedHoursSaved * 85); // $85/hr manager rate

  return (
    <section id="pricing" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <Badge variant="amber">Proposed Commercial Model</Badge>
        <h2 className="mt-3 text-3xl font-extrabold text-[#17251F] tracking-tight sm:text-4xl">
          Transparent, employee-based pricing.
        </h2>
        <p className="mt-3 text-sm text-[#747D75]">
          Proposed pricing hypothesis for enterprise calibration ($25/evaluated employee annually).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
        {/* Pricing Card */}
        <div className="md:col-span-6 bg-[#FFFFFF] border-2 border-[#17251F] rounded-2xl p-8 shadow-xl relative">
          <div className="absolute -top-3.5 right-6">
            <Badge variant="forest">Proposed Hypothesis</Badge>
          </div>

          <div className="text-xs font-bold text-[#747D75] uppercase tracking-wider">
            Enterprise Annual Evaluation
          </div>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-5xl font-black text-[#17251F]">$25</span>
            <span className="text-xs text-[#747D75]">per employee evaluated / year</span>
          </div>

          <p className="mt-3 text-xs text-[#747D75] leading-relaxed">
            Full annual 360° review cycle including all 4 quarters of OKRs, multi-rater feedback,
            AI synthesis studio, and manager calibration workflow.
          </p>

          <div className="my-6 border-t border-[#E6E8E1] pt-6 space-y-3 text-xs text-[#202820]">
            {[
              'Unlimited 360 peer feedback requests',
              'Full quarterly OKR tracking (Q1–Q4)',
              'AI Review Studio with local mock / API integration',
              'Evidence inspector with audit traceability',
              'Print-ready executive PDF report exports',
              'Role-based security (HR, Manager, Employee)'
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2C5E1A] shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <Link href="/dashboard" className="block w-full">
            <Button variant="primary" size="md" className="w-full">
              Explore Demo Workspace
            </Button>
          </Link>
          <div className="text-center text-[10px] text-[#747D75] mt-3">
            No credit card required. Works immediately in demo sandbox.
          </div>
        </div>

        {/* Interactive ROI Calculator Card */}
        <div className="md:col-span-6 p-7 bg-[#FFFFFF] border border-[#E6E8E1] rounded-2xl shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold text-[#17251F] uppercase tracking-wider">
            <Calculator className="w-4 h-4 text-[#5876D8]" />
            <span>Interactive ROI & Time Savings Calculator</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-[#17251F]">
              <span>Company Size (Evaluated Employees)</span>
              <span className="font-mono text-base">{employeeCount} People</span>
            </div>
            <input
              type="range"
              min={15}
              max={250}
              step={5}
              value={employeeCount}
              onChange={e => setEmployeeCount(parseInt(e.target.value))}
              className="w-full accent-[#17251F] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#747D75]">
              <span>15 Employees</span>
              <span>250 Employees</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-[#FAFBF8] border border-[#E6E8E1] rounded-xl">
              <span className="text-[10px] text-[#747D75] font-bold uppercase">Estimated Annual Cost</span>
              <div className="text-xl font-bold text-[#17251F] mt-1 font-mono">
                ${annualInvestment.toLocaleString()}
              </div>
            </div>
            <div className="p-3 bg-[#EEF9D1] border border-[#D6EFA0] rounded-xl">
              <span className="text-[10px] text-[#2C5E1A] font-bold uppercase">Manager Hours Saved</span>
              <div className="text-xl font-bold text-[#2C5E1A] mt-1 font-mono">
                {Math.round(estimatedHoursSaved)} hrs
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#17251F] text-white rounded-xl text-xs flex items-center justify-between">
            <div>
              <div className="text-[10px] text-[#C8ED78] font-bold uppercase">Estimated Net Productivity Gain</div>
              <div className="text-lg font-black text-white font-mono mt-0.5">
                ${(estimatedDollarSavings - annualInvestment).toLocaleString()}
              </div>
            </div>
            <Badge variant="lime">
              {Math.round((estimatedDollarSavings / Math.max(1, annualInvestment)))}x ROI
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Does ReviewForge require an external OpenAI API key to run?',
      a: 'No. ReviewForge includes a fully deterministic local mock synthesis engine that analyzes real seeded data (OKRs, peer feedback, self-reflections) to generate realistic reviews with verified evidence citations without any external API calls or tokens.'
    },
    {
      q: 'How does ReviewForge guarantee statements are backed by evidence?',
      a: 'Every generated claim in the AI Review Studio is tied to an EvidenceReference object referencing the source ID, date, and metrics. If an employee lacks sufficient records, the synthesis engine flags the missing evidence rather than hallucinating achievements.'
    },
    {
      q: 'Can employees view private manager notes or see who gave anonymous feedback?',
      a: 'Never. ReviewForge enforces strict role-based data isolation. Anonymous peer feedback masks the provider name and ID when viewed from an employee perspective, and manager private notes are completely filtered out of employee routes.'
    },
    {
      q: 'How does ReviewForge integrate with databases in a future production phase?',
      a: 'The application uses a clean repository abstraction layer (DataRepository) with standard async interfaces. LocalStorage is currently used for demo persistence, allowing a direct drop-in replacement with MongoDB or PostgreSQL without rewriting frontend components.'
    },
    {
      q: 'Can managers edit the review before sending it for approval?',
      a: 'Yes. Managers have complete inline editing capabilities, can regenerate individual sections on demand, and must explicitly approve the review before HR can release it to the employee.'
    }
  ];

  return (
    <section id="faq" className="py-20 bg-[#FFFFFF] border-t border-[#E6E8E1]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="sage">Frequently Asked Questions</Badge>
          <h2 className="mt-3 text-3xl font-extrabold text-[#17251F] tracking-tight">
            Common questions about ReviewForge.
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-[#E6E8E1] bg-[#FAFBF8] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-4.5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-[#17251F] cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#747D75] transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4.5 pb-4 text-xs text-[#747D75] leading-relaxed border-t border-[#E6E8E1] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function MarketingFooter() {
  return (
    <footer className="bg-[#17251F] text-white py-14 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#C8ED78] text-[#17251F] flex items-center justify-center font-bold text-sm">
                RF
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                Review<span className="text-[#C8ED78]">Forge</span>
              </span>
            </div>
            <p className="text-xs text-[#CADACD] leading-relaxed">
              Enterprise 360-degree performance review synthesizer turning scattered employee
              data into evidence-backed evaluations.
            </p>
          </div>

          <div>
            <div className="text-xs font-bold text-[#C8ED78] uppercase tracking-wider mb-3">
              Platform
            </div>
            <ul className="space-y-2 text-xs text-[#CADACD]">
              <li><Link href="/dashboard" className="hover:text-white">HR Dashboard</Link></li>
              <li><Link href="/ai-review-studio" className="hover:text-white">AI Review Studio</Link></li>
              <li><Link href="/okrs" className="hover:text-white">Quarterly OKRs</Link></li>
              <li><Link href="/feedback" className="hover:text-white">360° Peer Feedback</Link></li>
              <li><Link href="/approvals" className="hover:text-white">Approval Queue</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-bold text-[#C8ED78] uppercase tracking-wider mb-3">
              Governance
            </div>
            <ul className="space-y-2 text-xs text-[#CADACD]">
              <li><Link href="/settings" className="hover:text-white">Security & Anonymity</Link></li>
              <li><Link href="/analytics" className="hover:text-white">Calibration Analytics</Link></li>
              <li><Link href="/review-cycles" className="hover:text-white">Cycle Timelines</Link></li>
              <li><span className="text-white/40">SOC2 Type II (Aligned)</span></li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-bold text-[#C8ED78] uppercase tracking-wider mb-3">
              Demo Workspace
            </div>
            <p className="text-xs text-[#CADACD] mb-3 leading-relaxed">
              Experience the full 360 synthesis workflow with 12 seeded fictional employee records.
            </p>
            <Link href="/dashboard">
              <Button variant="accent" size="sm" className="w-full">
                Enter Demo Workspace
              </Button>
            </Link>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#CADACD] gap-4">
          <div>
            © 2026 ReviewForge SaaS Inc. All rights reserved. Fictional enterprise simulation.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-mono text-[#C8ED78]">
              Local Mock Engine • Zero Database Dependencies
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
