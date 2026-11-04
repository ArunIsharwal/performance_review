'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/storage/use-store';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/progress-bar';
import { Building, Users, Target, ArrowRight } from 'lucide-react';

export default function DepartmentsPage() {
  const { departments, employees, okrs } = useStore();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E6E8E1]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#17251F]">
            Departments & Squad Structure
          </h1>
          <p className="text-xs text-[#747D75] mt-1">
            Organizational division hierarchy, leadership assignment, and aggregated goal performance.
          </p>
        </div>
      </div>

      {/* Department Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {departments.map(dept => {
          const deptEmployees = employees.filter(e => e.departmentId === dept.id);

          return (
            <Card key={dept.id} className="flex flex-col justify-between hover:border-[#D0D4CA] transition-all">
              <CardHeader>
                <div>
                  <Badge variant="forest" className="font-mono text-[10px]">
                    {dept.code}
                  </Badge>
                  <CardTitle className="text-base mt-2">{dept.name}</CardTitle>
                </div>
                <div className="p-2 bg-[#FAFBF8] border border-[#E6E8E1] rounded-lg">
                  <Building className="w-4 h-4 text-[#747D75]" />
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-xs text-[#747D75] leading-relaxed">
                  {dept.description}
                </p>

                <div className="p-3 bg-[#FAFBF8] border border-[#E6E8E1] rounded-xl text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#747D75]">Department Head:</span>
                    <span className="font-bold text-[#17251F]">{dept.headName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#747D75]">Team Members:</span>
                    <span className="font-bold text-[#17251F]">{deptEmployees.length} on file</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-[#17251F]">
                    <span>Average OKR Progress</span>
                    <span>{dept.averageOkrCompletion}%</span>
                  </div>
                  <ProgressBar
                    value={dept.averageOkrCompletion}
                    size="sm"
                    colorScheme="lime"
                  />
                </div>
              </CardContent>

              <CardFooter>
                <Link
                  href={`/employees?dept=${dept.id}`}
                  className="w-full flex items-center justify-between text-xs font-semibold text-[#17251F] hover:text-[#5876D8]"
                >
                  <span>View Department Employees</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

