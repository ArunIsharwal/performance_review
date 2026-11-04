'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/storage/use-store';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  HelpCircle,
  Send
} from 'lucide-react';

export default function SelfReflectionsPage() {
  const {
    employees,
    selfReflections,
    saveSelfReflection,
    reviewCycles
  } = useStore();

  const activeCycle = reviewCycles.find(c => c.status === 'Active') || reviewCycles[0];

  // Current selected employee for reflection (defaults to Rahul Deshmukh or first employee)
  const [selectedEmpId, setSelectedEmpId] = useState(employees[1]?.id || employees[0]?.id || 'emp-002');
  const existing = selfReflections.find(
    r => r.employeeId === selectedEmpId && r.reviewCycleId === activeCycle?.id
  );

  // Form states
  const [majorAchievements, setMajorAchievements] = useState(
    existing?.majorAchievements ||
      'Spearheaded our core event broker migration to Apache Kafka with zero customer data loss. Directly drove our Q2 API optimization initiative, reducing average API latency by 31.5% across core endpoints.'
  );
  const [keyProjects, setKeyProjects] = useState(
    existing?.keyProjects ||
      '1. Cloud Event Bus Modernization\n2. Edge API Gateway Latency Overhaul\n3. Distributed Transaction Sagas'
  );
  const [challengesFaced, setChallengesFaced] = useState(
    existing?.challengesFaced ||
      'Encountered network socket bottlenecks under multi-region replication in Q3. Required kernel socket tuning and connection pool adjustments.'
  );
  const [skillsDeveloped, setSkillsDeveloped] = useState(
    existing?.skillsDeveloped.join(', ') || 'Apache Kafka, Rust Microservices, Linux eBPF, Distributed Caching'
  );
  const [collaborationHighlights, setCollaborationHighlights] = useState(
    existing?.collaborationHighlights ||
      'Partnered closely with Elena and Julian on the Review Studio streaming endpoint requirements. Mentored 2 junior engineers (Liam and Priya), conducting over 60 architectural code reviews.'
  );
  const [goalsAchieved, setGoalsAchieved] = useState(
    existing?.goalsAchieved ||
      'Surpassed Q2 latency target (achieved 31.5% vs 30% goal), zero Sev-0 outages related to data persistence.'
  );
  const [growthAreas, setGrowthAreas] = useState(
    existing?.growthAreas ||
      'Authoring structured Architecture Decision Records (ADRs) prior to sprint kickoff rather than relying on inline discussions.'
  );
  const [futureGoals, setFutureGoals] = useState(
    existing?.futureGoals ||
      'Lead our multi-region data residency architecture for European GDPR compliance in H1 2027 and present our review synthesis pipeline at an enterprise cloud conference.'
  );

  const selectedEmployee = employees.find(e => e.id === selectedEmpId) || employees[0];

  const handleEmployeeChange = (id: string) => {
    setSelectedEmpId(id);
    const rec = selfReflections.find(r => r.employeeId === id);
    if (rec) {
      setMajorAchievements(rec.majorAchievements);
      setKeyProjects(rec.keyProjects);
      setChallengesFaced(rec.challengesFaced);
      setSkillsDeveloped(rec.skillsDeveloped.join(', '));
      setCollaborationHighlights(rec.collaborationHighlights);
      setGoalsAchieved(rec.goalsAchieved);
      setGrowthAreas(rec.growthAreas);
      setFutureGoals(rec.futureGoals);
    } else {
      setMajorAchievements('');
      setKeyProjects('');
      setChallengesFaced('');
      setSkillsDeveloped('');
      setCollaborationHighlights('');
      setGoalsAchieved('');
      setGrowthAreas('');
      setFutureGoals('');
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    saveSelfReflection({
      employeeId: selectedEmployee.id,
      reviewCycleId: activeCycle?.id || 'cycle-2026-annual',
      period: activeCycle?.period || 'FY2026',
      majorAchievements,
      keyProjects,
      challengesFaced,
      skillsDeveloped: skillsDeveloped.split(',').map(s => s.trim()).filter(Boolean),
      collaborationHighlights,
      goalsAchieved,
      growthAreas,
      futureGoals
    });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E6E8E1]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-[#17251F]">
              Employee Self-Reflection
            </h1>
            <Badge variant="blue">Employee-Led</Badge>
          </div>
          <p className="text-xs text-[#747D75] mt-1">
            Annual self-evaluation for {activeCycle?.title}. Feeds directly into AI Review Studio evidence synthesis.
          </p>
        </div>

        {/* Demo employee switcher */}
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-[#17251F]">Reflection For:</span>
          <select
            value={selectedEmpId}
            onChange={e => handleEmployeeChange(e.target.value)}
            className="px-3 py-1.5 bg-[#FFFFFF] border border-[#E6E8E1] rounded-lg text-xs font-semibold text-[#17251F] focus:outline-none"
          >
            {employees.map(e => (
              <option key={e.id} value={e.id}>
                {e.name} ({e.jobTitle})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Instructions Card */}
      <div className="p-4 bg-[#FAFBF8] border border-[#E6E8E1] rounded-2xl flex items-start gap-3.5 text-xs text-[#747D75]">
        <HelpCircle className="w-5 h-5 text-[#5876D8] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-semibold text-[#17251F]">
            How Self-Reflections Power Your Annual Review
          </div>
          <p className="leading-relaxed">
            Your self-reflection is an essential input into your final evaluation. The AI Review Studio
            cites your recorded projects and goals alongside peer feedback and OKRs, ensuring that your
            personal perspective and quiet wins are fully recognized by leadership.
          </p>
        </div>
      </div>

      {/* Form Card */}
      <Card>
        <CardHeader>
          <div>
            <span className="text-[10px] font-bold text-[#5876D8] uppercase tracking-wider">
              {activeCycle?.period} Evaluation Form
            </span>
            <CardTitle className="text-base mt-1">
              {selectedEmployee?.name}&apos;s Annual Reflection
            </CardTitle>
          </div>
          {existing && (
            <Badge variant="lime" dot>
              Submitted on {existing.submittedAt}
            </Badge>
          )}
        </CardHeader>

        <form onSubmit={handleSave}>
          <CardContent className="space-y-6 text-xs">
            {/* 1. Major Achievements */}
            <div className="space-y-1.5">
              <label className="block font-bold text-[#17251F]">
                1. Major Achievements & Deliverables
              </label>
              <p className="text-[11px] text-[#747D75]">
                What were your most impactful contributions this year? Cite quantitative metrics where possible.
              </p>
              <textarea
                rows={3}
                required
                value={majorAchievements}
                onChange={e => setMajorAchievements(e.target.value)}
                placeholder="e.g. Led the API caching initiative which reduced P99 latency by 31.5%..."
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E6E8E1] rounded-xl text-xs focus:ring-1 focus:ring-[#17251F]"
              />
            </div>

            {/* 2. Key Projects */}
            <div className="space-y-1.5">
              <label className="block font-bold text-[#17251F]">
                2. Key Projects Delivered
              </label>
              <p className="text-[11px] text-[#747D75]">
                List the 2-3 most significant projects you owned or contributed to.
              </p>
              <textarea
                rows={3}
                required
                value={keyProjects}
                onChange={e => setKeyProjects(e.target.value)}
                placeholder="1. Cloud Event Bus Modernization\n2. Edge Gateway Latency Overhaul..."
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E6E8E1] rounded-xl text-xs focus:ring-1 focus:ring-[#17251F]"
              />
            </div>

            {/* 3. Challenges Faced & Overcome */}
            <div className="space-y-1.5">
              <label className="block font-bold text-[#17251F]">
                3. Challenges & Roadblocks Overcome
              </label>
              <p className="text-[11px] text-[#747D75]">
                What unexpected obstacles arose, and how did you resolve them?
              </p>
              <textarea
                rows={2}
                value={challengesFaced}
                onChange={e => setChallengesFaced(e.target.value)}
                placeholder="Describe any technical or organizational bottlenecks..."
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E6E8E1] rounded-xl text-xs focus:ring-1 focus:ring-[#17251F]"
              />
            </div>

            {/* 4. Skills Developed */}
            <div className="space-y-1.5">
              <label className="block font-bold text-[#17251F]">
                4. Skills & Capabilities Acquired (comma separated)
              </label>
              <input
                type="text"
                value={skillsDeveloped}
                onChange={e => setSkillsDeveloped(e.target.value)}
                placeholder="e.g. Apache Kafka, Rust, eBPF, Distributed Caching"
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E6E8E1] rounded-xl text-xs focus:ring-1 focus:ring-[#17251F]"
              />
            </div>

            {/* 5. Collaboration */}
            <div className="space-y-1.5">
              <label className="block font-bold text-[#17251F]">
                5. Cross-Functional Collaboration & Mentorship
              </label>
              <p className="text-[11px] text-[#747D75]">
                How did you support teammates, mentor peers, or partner across departments?
              </p>
              <textarea
                rows={2}
                value={collaborationHighlights}
                onChange={e => setCollaborationHighlights(e.target.value)}
                placeholder="e.g. Mentored 2 junior engineers, partnered with product design..."
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E6E8E1] rounded-xl text-xs focus:ring-1 focus:ring-[#17251F]"
              />
            </div>

            {/* 6. Growth Areas & Future Goals */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block font-bold text-[#17251F]">
                  6. Areas for Personal Development
                </label>
                <textarea
                  rows={2}
                  value={growthAreas}
                  onChange={e => setGrowthAreas(e.target.value)}
                  placeholder="Where would you like to improve next year?"
                  className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E6E8E1] rounded-xl text-xs focus:ring-1 focus:ring-[#17251F]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block font-bold text-[#17251F]">
                  7. Future Goals & Aspirations
                </label>
                <textarea
                  rows={2}
                  value={futureGoals}
                  onChange={e => setFutureGoals(e.target.value)}
                  placeholder="Where do you see your technical trajectory heading?"
                  className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E6E8E1] rounded-xl text-xs focus:ring-1 focus:ring-[#17251F]"
                />
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <span className="text-[11px] text-[#747D75]">
              Saves locally to demo repository and links to AI Review Studio.
            </span>
            <Button type="submit" variant="primary" size="sm" rightIcon={<Send className="w-3.5 h-3.5" />}>
              Save Self-Reflection
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
