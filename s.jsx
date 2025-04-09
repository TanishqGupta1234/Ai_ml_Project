import React from 'react';
import { BarChart3, Activity, TrendingUp, Users, Calendar, AlertTriangle, Zap, BarChart2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 pt-20 pb-12">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 md:col-span-3">
            <div className="sticky top-24 space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Team Controls</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <button className="w-full flex items-center justify-center p-2.5 rounded-lg bg-primary text-white hover:bg-primary/90 transition-all">
                    <Users size={18} className="mr-2" />
                    Select Team
                  </button>
                  
                  <button className="w-full flex items-center justify-center p-2.5 rounded-lg bg-secondary text-foreground hover:bg-secondary/80 transition-all">
                    <Calendar size={18} className="mr-2" />
                    Schedule Training
                  </button>
                  
                  <div className="space-y-3 pt-2">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs text-muted-foreground">Analysis Depth</label>
                        <span className="text-xs font-medium">In-depth</span>
                      </div>
                      <input 
                        type="range" 
                        className="w-full h-1.5 appearance-none rounded-full bg-secondary outline-none accent-primary"
                        min={1}
                        max={3}
                        step={1}
                        defaultValue={3}
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs text-muted-foreground">Time Frame</label>
                        <span className="text-xs font-medium">Last 4 Weeks</span>
                      </div>
                      <input 
                        type="range" 
                        className="w-full h-1.5 appearance-none rounded-full bg-secondary outline-none accent-primary"
                        min={1}
                        max={3}
                        step={1}
                        defaultValue={2}
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs text-muted-foreground">Prediction Confidence</label>
                        <span className="text-xs font-medium">85%</span>
                      </div>
                      <input 
                        type="range" 
                        className="w-full h-1.5 appearance-none rounded-full bg-secondary outline-none accent-primary"
                        min={70}
                        max={95}
                        step={5}
                        defaultValue={85}
                      />
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <div className="text-xs text-muted-foreground text-center mb-1">
                      Data Processing: Complete
                    </div>
                    <Progress value={100} className="h-1.5" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="col-span-12 md:col-span-9 space-y-6">
            <div>
              <h1 className="text-3xl font-semibold mb-2">SportSense Dashboard</h1>
              <p className="text-muted-foreground">AI-powered analytics for optimizing team performance and reducing injury risks</p>
            </div>
            
            {/* Team Performance Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-white shadow-sm hover:shadow transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm text-muted-foreground">Team Performance</h3>
                    <BarChart3 size={18} className="text-primary" />
                  </div>
                  <div className="text-2xl font-semibold">82%</div>
                  <div className="text-xs text-green-500 mt-1">↑ 6.3% vs. previous month</div>
                </CardContent>
              </Card>
              
              <Card className="bg-white shadow-sm hover:shadow transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm text-muted-foreground">Player Readiness</h3>
                    <Activity size={18} className="text-primary" />
                  </div>
                  <div className="text-2xl font-semibold">78%</div>
                  <div className="text-xs text-red-500 mt-1">↓ 2.5% vs. previous week</div>
                </CardContent>
              </Card>
              
              <Card className="bg-white shadow-sm hover:shadow transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm text-muted-foreground">Injury Risk</h3>
                    <AlertTriangle size={18} className="text-primary" />
                  </div>
                  <div className="text-2xl font-semibold">Medium</div>
                  <div className="text-xs text-yellow-500 mt-1">3 players at risk</div>
                </CardContent>
              </Card>
              
              <Card className="bg-white shadow-sm hover:shadow transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm text-muted-foreground">Training Efficiency</h3>
                    <Zap size={18} className="text-primary" />
                  </div>
                  <div className="text-2xl font-semibold">76%</div>
                  <div className="text-xs text-green-500 mt-1">↑ 4.1% optimization</div>
                </CardContent>
              </Card>
            </div>
            
            {/* Optimal Team Selection */}
            <Card className="bg-white shadow-sm hover:shadow transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Recommended Team Selection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 font-medium text-muted-foreground">Player</th>
                        <th className="text-left py-3 font-medium text-muted-foreground">Position</th>
                        <th className="text-left py-3 font-medium text-muted-foreground">Form</th>
                        <th className="text-left py-3 font-medium text-muted-foreground">Fitness</th>
                        <th className="text-left py-3 font-medium text-muted-foreground">Risk</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: 'Michael Thompson', position: 'Forward', form: 'Excellent', fitness: '92%', risk: 'Low' },
                        { name: 'James Wilson', position: 'Midfielder', form: 'Good', fitness: '87%', risk: 'Low' },
                        { name: 'Robert Johnson', position: 'Defender', form: 'Good', fitness: '85%', risk: 'Low' },
                        { name: 'David Martinez', position: 'Forward', form: 'Average', fitness: '78%', risk: 'Medium' },
                        { name: 'Steven Taylor', position: 'Midfielder', form: 'Good', fitness: '83%', risk: 'Low' },
                        { name: 'Anthony Harris', position: 'Defender', form: 'Excellent', fitness: '90%', risk: 'Low' },
                        { name: 'Kevin Anderson', position: 'Goalkeeper', form: 'Good', fitness: '86%', risk: 'Low' }
                      ].map((player, i) => (
                        <tr key={i} className="border-b border-gray-200">
                          <td className="py-3 font-medium">{player.name}</td>
                          <td className="py-3 text-muted-foreground">{player.position}</td>
                          <td className="py-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              player.form === 'Excellent' ? 'bg-green-100 text-green-800' : 
                              player.form === 'Good' ? 'bg-blue-100 text-blue-800' : 
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {player.form}
                            </span>
                          </td>
                          <td className="py-3">
                            <div className="flex items-center">
                              <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    parseInt(player.fitness) > 85 ? 'bg-green-500' : 
                                    parseInt(player.fitness) > 75 ? 'bg-blue-500' : 
                                    'bg-yellow-500'
                                  }`} 
                                  style={{ width: player.fitness }}
                                ></div>
                              </div>
                              <span className="text-xs">{player.fitness}</span>
                            </div>
                          </td>
                          <td className="py-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              player.risk === 'Low' ? 'bg-green-100 text-green-800' : 
                              player.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'
                            }`}>
                              {player.risk}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            
            {/* Training Workload Distribution */}
            <Card className="bg-white shadow-sm hover:shadow transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Training Workload Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                  {[
                    { name: 'Cardio', value: 'Moderate', recommendation: 'Increase slightly' },
                    { name: 'Strength', value: 'High', recommendation: 'Maintain' },
                    { name: 'Technical', value: 'Moderate', recommendation: 'Increase' },
                    { name: 'Tactical', value: 'Moderate', recommendation: 'Maintain' }
                  ].map((type, i) => (
                    <div key={i} className="space-y-1">
                      <div className="text-sm text-muted-foreground">{type.name}</div>
                      <div className="text-base font-medium">{type.value}</div>
                      <div className="text-xs text-primary">{type.recommendation}</div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Team Training Intensity</span>
                      <span className="text-xs font-medium">75%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2.5">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Recovery Sessions</span>
                      <span className="text-xs font-medium">60%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2.5">
                      <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Tactical Sessions</span>
                      <span className="text-xs font-medium">80%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Injury Risk Assessment */}
            <Card className="bg-white shadow-sm hover:shadow transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Injury Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Carlos Rodriguez', position: 'Defender', risk: 'High', factors: ['Previous injury', 'High workload', 'Fatigue'], recommendation: 'Reduce training intensity by 30%, focus on recovery' },
                    { name: 'Alex Turner', position: 'Midfielder', risk: 'Medium', factors: ['Fatigue', 'Muscular imbalance'], recommendation: 'Additional strength work for hamstrings, monitor workload' },
                    { name: 'David Martinez', position: 'Forward', risk: 'Medium', factors: ['Recent minor strain', 'Game frequency'], recommendation: 'Limit playing time to 60 minutes, additional recovery' }
                  ].map((player, i) => (
                    <div key={i} className="p-4 border border-gray-100 rounded-lg">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium">{player.name}</h3>
                            <span className="text-xs text-muted-foreground ml-2">({player.position})</span>
                          </div>
                          <div className="flex items-center mt-1">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              player.risk === 'High' ? 'bg-red-100 text-red-800' : 
                              player.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-green-100 text-green-800'
                            }`}>
                              {player.risk} Risk
                            </span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="mt-2 md:mt-0">
                          View Details
                        </Button>
                      </div>
                      
                      <div className="text-xs space-y-2">
                        <div>
                          <span className="text-muted-foreground">Contributing Factors: </span>
                          {player.factors.map((factor, j) => (
                            <span key={j} className="inline-block bg-secondary px-2 py-1 rounded-full mr-1 mb-1">
                              {factor}
                            </span>
                          ))}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Recommendation: </span>
                          <span>{player.recommendation}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Player Development Tracking */}
            <Card className="bg-white shadow-sm hover:shadow transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Player Development Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 overflow-y-auto text-sm bg-secondary/50 p-3 rounded-md">
                  <div className="space-y-2">
                    <p className="text-primary font-medium">▶ Team Overview</p>
                    <p className="text-muted-foreground">The team has shown a 12% improvement in overall performance metrics compared to the beginning of the season. Technical skills have improved consistently, while tactical understanding shows uneven development across the squad.</p>
                    
                    <p className="text-primary font-medium mt-3">▶ Key Improvement Areas</p>
                    <p className="text-muted-foreground">Defensive transition speed has improved by 8.3% across the team. Offensive set pieces show a 15% higher success rate. Midfield pressing coordination needs additional focus.</p>
                    
                    <p className="text-primary font-medium mt-3">▶ Individual Standouts</p>
                    <p className="text-muted-foreground">James Wilson has shown exceptional development in passing accuracy (+14%). Michael Thompson's shooting efficiency has increased by 22% following the adjusted training program.</p>
                    
                    <p className="text-primary font-medium mt-3">▶ AI Recommendations</p>
                    <p className="text-muted-foreground">Implement specialized drills focusing on defensive shape during transitions. Increase small-sided games with tactical constraints to improve decision-making. Individual development plans have been updated for 5 players.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;