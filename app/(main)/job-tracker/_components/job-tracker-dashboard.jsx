"use client";

import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Calendar, 
  Building, 
  Briefcase, 
  CheckCircle, 
  Clock, 
  XCircle, 
  AlertCircle 
} from "lucide-react";

// Mock data for initial development
const mockApplications = [
  {
    id: 1,
    company: "TechCorp Inc.",
    position: "Senior Frontend Developer",
    status: "applied",
    dateApplied: "2023-06-15",
    notes: "Applied through company website",
    nextStep: "Follow up in 1 week"
  },
  {
    id: 2,
    company: "Innovate Solutions",
    position: "Product Manager",
    status: "interview",
    dateApplied: "2023-06-10",
    notes: "First interview scheduled for next week",
    nextStep: "Prepare for technical interview"
  },
  {
    id: 3,
    company: "Global Systems",
    position: "DevOps Engineer",
    status: "offer",
    dateApplied: "2023-06-05",
    notes: "Received offer letter",
    nextStep: "Review offer details"
  },
  {
    id: 4,
    company: "StartupX",
    position: "Full Stack Developer",
    status: "rejected",
    dateApplied: "2023-06-01",
    notes: "Feedback: Looking for more experience",
    nextStep: "Apply to similar positions"
  }
];

const statusOptions = [
  { value: "applied", label: "Applied", icon: Clock },
  { value: "interview", label: "Interview", icon: Calendar },
  { value: "offer", label: "Offer", icon: CheckCircle },
  { value: "rejected", label: "Rejected", icon: XCircle },
  { value: "accepted", label: "Accepted", icon: CheckCircle },
  { value: "withdrawn", label: "Withdrawn", icon: AlertCircle }
];

export default function JobTrackerDashboard() {
  const [applications, setApplications] = useState(mockApplications);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newApplication, setNewApplication] = useState({
    company: "",
    position: "",
    status: "applied",
    dateApplied: new Date().toISOString().split('T')[0],
    notes: "",
    nextStep: ""
  });

  const handleAddApplication = () => {
    const newApp = {
      ...newApplication,
      id: applications.length + 1
    };
    setApplications([...applications, newApp]);
    setIsAddDialogOpen(false);
    setNewApplication({
      company: "",
      position: "",
      status: "applied",
      dateApplied: new Date().toISOString().split('T')[0],
      notes: "",
      nextStep: ""
    });
  };

  const getStatusBadge = (status) => {
    const statusOption = statusOptions.find(opt => opt.value === status);
    const StatusIcon = statusOption?.icon || Clock;
    
    let badgeVariant = "outline";
    if (status === "offer") badgeVariant = "success";
    if (status === "interview") badgeVariant = "default";
    if (status === "rejected") badgeVariant = "destructive";
    if (status === "accepted") badgeVariant = "success";
    if (status === "withdrawn") badgeVariant = "secondary";
    
    return (
      <Badge variant={badgeVariant} className="flex items-center gap-1">
        <StatusIcon className="h-3 w-3" />
        {statusOption?.label || "Applied"}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applications.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviews</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {applications.filter(app => app.status === "interview").length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offers</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {applications.filter(app => app.status === "offer").length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {applications.length > 0 
                ? Math.round((applications.filter(app => 
                    app.status === "offer" || app.status === "accepted").length / applications.length) * 100) 
                : 0}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Applications Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Job Applications</CardTitle>
            <CardDescription>Track and manage your job applications</CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Application
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Application</DialogTitle>
                <DialogDescription>
                  Enter the details of your job application
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="company" className="text-right">
                    Company
                  </Label>
                  <Input
                    id="company"
                    value={newApplication.company}
                    onChange={(e) => setNewApplication({...newApplication, company: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="position" className="text-right">
                    Position
                  </Label>
                  <Input
                    id="position"
                    value={newApplication.position}
                    onChange={(e) => setNewApplication({...newApplication, position: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Status
                  </Label>
                  <Select 
                    value={newApplication.status}
                    onValueChange={(value) => setNewApplication({...newApplication, status: value})}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="dateApplied" className="text-right">
                    Date Applied
                  </Label>
                  <Input
                    id="dateApplied"
                    type="date"
                    value={newApplication.dateApplied}
                    onChange={(e) => setNewApplication({...newApplication, dateApplied: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">
                    Notes
                  </Label>
                  <Textarea
                    id="notes"
                    value={newApplication.notes}
                    onChange={(e) => setNewApplication({...newApplication, notes: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="nextStep" className="text-right">
                    Next Step
                  </Label>
                  <Input
                    id="nextStep"
                    value={newApplication.nextStep}
                    onChange={(e) => setNewApplication({...newApplication, nextStep: e.target.value})}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddApplication}>Add Application</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Applied</TableHead>
                <TableHead>Next Step</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell className="font-medium">{application.company}</TableCell>
                  <TableCell>{application.position}</TableCell>
                  <TableCell>{getStatusBadge(application.status)}</TableCell>
                  <TableCell>{new Date(application.dateApplied).toLocaleDateString()}</TableCell>
                  <TableCell>{application.nextStep}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
} 