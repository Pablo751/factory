import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const ProductionPlanner = () => {
  const [currentMonth] = useState('December');
  const [currentYear] = useState(2024);
  
  const staffConfig = {
    CUTTING: [
      { name: 'BLUE MACHINE', role: 'CUT', dailyTarget: 400, avgOctober: 343, color: 'bg-blue-100' },
      { name: 'WHITE MACHINE', role: 'CUT', dailyTarget: 400, avgOctober: 139, color: 'bg-gray-100' }
    ],
    SEWING: [
      { name: 'AY', role: 'SEW', dailyTarget: 100, avgOctober: 92, color: 'bg-green-100' },
      { name: 'DAX', role: 'SEW', dailyTarget: 100, avgOctober: 71, color: 'bg-green-100' },
      { name: 'KATE', role: 'SEW', dailyTarget: 100, avgOctober: 92, color: 'bg-green-100' },
      { name: 'LIZ', role: 'SEW', dailyTarget: 100, avgOctober: 69, color: 'bg-green-100' },
      { name: 'PAULINE', role: 'SEW', dailyTarget: 100, avgOctober: 112, color: 'bg-green-100' },
      { name: 'SANDRA', role: 'SEW', dailyTarget: 100, avgOctober: 55, color: 'bg-green-100' }
    ],
    CLIPPING: [
      { name: 'CLIPPER 1', role: 'CLIP', dailyTarget: 100, color: 'bg-yellow-100' }
    ],
    DISPATCH: [
      { name: 'DISPATCH', role: 'DISPATCH', dailyTarget: 549, avgOctober: 549, color: 'bg-purple-100' }
    ]
  };

  const materialAlerts = [
    { item: 'CT65 Black', current: 2400, usage: 811, status: 'warning' },
    { item: 'RUBSTD RUBBER', current: 472, usage: 120, status: 'critical' },
    { item: 'Clips D', current: 1539, usage: 1539, status: 'warning' }
  ];

  const getDaysInMonth = (year, month) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const days = getDaysInMonth(2024, 11);

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="grid gap-4">
        {/* Material Alerts */}
        <div className="grid grid-cols-3 gap-2">
          {materialAlerts.map((alert, index) => (
            <div 
              key={index} 
              className={`p-4 rounded-lg border ${
                alert.status === 'critical' ? 'border-red-500 bg-red-50' : 'border-yellow-500 bg-yellow-50'
              }`}
            >
              <div className="flex justify-between font-semibold">
                {alert.item}
                <span className={alert.status === 'critical' ? 'text-red-500' : 'text-yellow-500'}>
                  {alert.status === 'critical' ? 'Low Stock!' : 'Check Stock'}
                </span>
              </div>
              <p className="text-sm mt-1">Current: {alert.current} | Usage: {alert.usage}</p>
            </div>
          ))}
        </div>

        {/* Main Production Card */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-bold">
                Production Planner - {currentMonth} {currentYear}
              </CardTitle>
              <div className="flex gap-4">
                <button className="px-4 py-2 bg-blue-500 text-white rounded">
                  Manage Staff
                </button>
                <button className="px-4 py-2 bg-green-500 text-white rounded">
                  Update Production
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Staff Schedule Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Staff Schedule & Production</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border p-2 bg-gray-50">Staff Member</th>
                      <th className="border p-2 bg-gray-50">Role</th>
                      <th className="border p-2 bg-gray-50">Daily Target</th>
                      <th className="border p-2 bg-gray-50">Oct Avg</th>
                      {days.map((day, index) => (
                        <th key={index} className="border p-2 bg-gray-50 min-w-[80px]">
                          {day.getDate()}<br/>
                          {day.toLocaleDateString('en-US', { weekday: 'short' })}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(staffConfig).map(([department, staff]) => (
                      staff.map((member, index) => (
                        <tr key={`${department}-${index}`} className={member.color}>
                          <td className="border p-2">{member.name}</td>
                          <td className="border p-2">{member.role}</td>
                          <td className="border p-2 text-center">{member.dailyTarget}</td>
                          <td className="border p-2 text-center">{member.avgOctober || '-'}</td>
                          {days.map((day, dayIndex) => (
                            <td key={dayIndex} className="border p-2 text-center">
                              <div className="flex flex-col gap-1">
                                <input 
                                  type="number" 
                                  className="w-16 p-1 border rounded" 
                                  placeholder="0"
                                />
                                <select className="w-16 text-xs border rounded">
                                  <option value="present">✓</option>
                                  <option value="off">Off</option>
                                  <option value="holiday">Holiday</option>
                                  <option value="sick">Sick</option>
                                </select>
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sales Channel & Dispatch Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Sales Channel & Dispatch Tracking</h3>
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-2">Today's Orders</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>eBay:</span>
                        <span className="font-medium">245</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Amazon:</span>
                        <span className="font-medium">123</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Direct:</span>
                        <span className="font-medium">89</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-2">Dispatch Status</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>To Process:</span>
                        <span className="font-medium">457</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>In Progress:</span>
                        <span className="font-medium">234</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Completed:</span>
                        <span className="font-medium">189</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-2">Weekly Progress</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Target:</span>
                        <span className="font-medium">2500</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Actual:</span>
                        <span className="font-medium">2345</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{width: '94%'}}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Department Totals */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Department Totals & Targets</h3>
              <div className="grid grid-cols-4 gap-4">
                <Card className="bg-blue-50">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-lg font-semibold">Cutting</div>
                      <div className="text-3xl font-bold">800</div>
                      <div className="text-sm text-gray-600">Daily Target</div>
                      <div className="text-xs text-gray-500">Oct Avg: 482</div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-green-50">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-lg font-semibold">Sewing</div>
                      <div className="text-3xl font-bold">600</div>
                      <div className="text-sm text-gray-600">Daily Target</div>
                      <div className="text-xs text-gray-500">Oct Avg: 512</div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-yellow-50">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-lg font-semibold">Clipping</div>
                      <div className="text-3xl font-bold">100</div>
                      <div className="text-sm text-gray-600">Daily Target</div>
                      <div className="text-xs text-gray-500">New Department</div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-purple-50">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-lg font-semibold">Dispatch</div>
                      <div className="text-3xl font-bold">549</div>
                      <div className="text-sm text-gray-600">Daily Target</div>
                      <div className="text-xs text-gray-500">Oct Avg: 549</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductionPlanner;
