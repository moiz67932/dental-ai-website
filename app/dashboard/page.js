'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Activity, 
  Phone, 
  Calendar, 
  Settings, 
  BarChart3, 
  RefreshCw,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Clock,
  Users
} from 'lucide-react';
import { toast } from 'sonner';

const BookingsTable = ({ bookings }) => (
  <div className="space-y-4">
    {bookings.map((booking) => (
      <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <div>
            <p className="font-medium">{booking.patient}</p>
            <p className="text-sm text-gray-500">{booking.date} • {booking.phone}</p>
          </div>
        </div>
        <Badge 
          variant={
            booking.status === 'Confirmed' ? 'default' :
            booking.status === 'Pending' ? 'secondary' : 'outline'
          }
        >
          {booking.status}
        </Badge>
      </div>
    ))}
  </div>
);

export default function DashboardPage() {
  const [metrics, setMetrics] = useState({
    calls_today: 12,
    avg_length: '1m 32s',
    bookings: 8,
    conversion: 48,
    next_7_days: 23,
    no_shows: 3,
    status: 'online',
    lastRestart: new Date().toISOString(),
    cpu: '12%',
    memory: '340MB',
  });
  const [loading, setLoading] = useState(false);
  const [bookings] = useState([
    { id: 1, date: 'Today 2:30 PM', patient: 'Sarah Johnson', phone: '(555) 123-4567', status: 'Confirmed' },
    { id: 2, date: 'Today 4:15 PM', patient: 'Mike Chen', phone: '(555) 987-6543', status: 'Confirmed' },
    { id: 3, date: 'Tomorrow 9:00 AM', patient: 'Emma Davis', phone: '(555) 555-1234', status: 'Pending' },
    { id: 4, date: 'Tomorrow 11:30 AM', patient: 'John Smith', phone: '(555) 444-5555', status: 'Confirmed' },
  ]);

  useEffect(() => {
    // Fetch initial metrics
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      // In a real app, this would fetch from your API
      setMetrics(prev => ({
        ...prev,
        calls_today: Math.floor(Math.random() * 20) + 5,
        bookings: Math.floor(Math.random() * 15) + 3,
      }));
    } catch (error) {
      toast.error('Failed to fetch metrics');
    }
  };

  const handleRestartContainer = async () => {
    setLoading(true);
    try {
      // Mock restart
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setMetrics(prev => ({
        ...prev,
        lastRestart: new Date().toISOString(),
        status: 'online'
      }));
      
      toast.success('Container restarted successfully');
    } catch (error) {
      toast.error('Failed to restart container');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Good afternoon, Dr. Smith</h1>
          <p className="text-gray-600 mt-2">Here's how your AI receptionist is performing today</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Panel - Tabs */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="bookings">Bookings</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Calls Today</CardTitle>
                      <Phone className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{metrics.calls_today}</div>
                      <p className="text-xs text-muted-foreground">
                        Avg length {metrics.avg_length}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Bookings</CardTitle>
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{metrics.bookings}</div>
                      <p className="text-xs text-muted-foreground">
                        {metrics.conversion}% conversion
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Next 7 days</CardTitle>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{metrics.next_7_days}</div>
                      <p className="text-xs text-muted-foreground">
                        upcoming appointments
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">No-Shows</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{metrics.no_shows}</div>
                      <p className="text-xs text-muted-foreground">
                        last 30 days
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Bookings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Bookings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BookingsTable bookings={bookings.slice(0, 3)} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bookings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>All Bookings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BookingsTable bookings={bookings} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Clinic Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        To modify clinic settings, please run through the setup wizard again.
                      </AlertDescription>
                    </Alert>
                    
                    <Button variant="outline" asChild>
                      <a href="/wizard/1">
                        Update Settings
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Panel - Status */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>System Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Status</span>
                  <Badge 
                    variant={metrics.status === 'online' ? 'default' : 'destructive'}
                    className="flex items-center space-x-1"
                  >
                    <CheckCircle className="h-3 w-3" />
                    <span className="capitalize">{metrics.status}</span>
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Last Restart</span>
                  <span className="text-sm text-gray-600">
                    {new Date(metrics.lastRestart).toLocaleTimeString()}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">CPU Usage</span>
                  <span className="text-sm text-gray-600">{metrics.cpu}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Memory</span>
                  <span className="text-sm text-gray-600">{metrics.memory}</span>
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={handleRestartContainer}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Restarting...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Restart Container
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  View detailed metrics and logs in Grafana
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <a 
                    href="http://localhost:3001/grafana?orgId=1" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Open Grafana
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}