"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CreditCard,
  Workflow,
  Clock,
  ExternalLink,
  Plus,
  ArrowRight,
  Filter,
  Activity,
  Globe,
  Settings,
  Database,
  Terminal,
  Webhook,
  DollarSign,
  TrendingUp,
  XCircle,
  CheckCircle2,
  Link,
  Play,
  Sparkles,
  ShoppingBag,
  Store,
  Laptop,
  AlertCircle,
  Users,
  Check,
  X,
  Zap,
  Clock as ClockIcon
} from "lucide-react";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Panel,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  MarkerType,
  Position,
  Handle,
  NodeProps
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const WORKFLOW_TABS = [
  {
    id: "ecommerce",
    label: "E-commerce",
    icon: ShoppingBag,
    description: "Order delivery & customer automation",
    color: "from-amber-500 to-orange-500",
    panelTitle: "Seamless Fulfillment",
    panelDescription: "When a payment succeeds, instantly dispatch delivery, send order confirmations, and log everything—all automatically.",
  },
  {
    id: "merchants",
    label: "Merchants",
    icon: Store,
    description: "Payment success workflows",
    color: "from-emerald-500 to-teal-500",
    panelTitle: "Revenue Celebration",
    panelDescription: "Turn every successful payment into multi-channel notifications, CRM updates, and real-time team visibility.",
  },
  {
    id: "saas",
    label: "SaaS",
    icon: Laptop,
    description: "Subscription & billing automation",
    color: "from-blue-500 to-indigo-500",
    panelTitle: "Subscription Intelligence",
    panelDescription: "Automate renewal invoices, sync customer data to your CRM, and keep your team informed on recurring revenue.",
  },
  {
    id: "risk",
    label: "Risk & Fraud",
    icon: AlertCircle,
    description: "High risk score automation",
    color: "from-rose-500 to-red-500",
    panelTitle: "Instant Risk Response",
    panelDescription: "When fraud signals spike, trigger immediate alerts to PagerDuty, create tickets for review, and notify your security team.",
  },
  {
    id: "cart",
    label: "Recovery",
    icon: Users,
    description: "Cart abandonment recovery",
    color: "from-purple-500 to-pink-500",
    panelTitle: "Win Them Back",
    panelDescription: "Recover abandoned carts with automated email and SMS reminders, while updating your CRM for personalized follow-ups.",
  },
];

const WORKFLOW_CONFIGS: Record<string, { nodes: any[]; edges: Edge[] }> = {
  ecommerce: {
    nodes: [
      { id: "trigger-1", type: "trigger", position: { x: 50, y: 180 }, data: { label: "Payment Success", triggerType: "payment.success", status: "idle" } },
      { id: "action-delivery", type: "action", position: { x: 300, y: 50 }, data: { label: "Create Delivery", provider: "yango", status: "idle" } },
      { id: "action-email", type: "action", position: { x: 300, y: 180 }, data: { label: "Send Email", provider: "resend", status: "idle" } },
      { id: "action-sheets", type: "action", position: { x: 550, y: 120 }, data: { label: "Log Order", provider: "google-sheets", status: "idle" } },
      { id: "action-slack", type: "action", position: { x: 550, y: 240 }, data: { label: "Notify Slack", provider: "slack", status: "idle" } },
    ],
    edges: [
      { id: "e1", source: "trigger-1", target: "action-delivery", animated: true, style: { stroke: "var(--color-fd-primary)", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: "var(--color-fd-primary)" } },
      { id: "e2", source: "trigger-1", target: "action-email", animated: true, style: { stroke: "var(--color-fd-primary)", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: "var(--color-fd-primary)" } },
      { id: "e3", source: "action-delivery", target: "action-sheets", animated: true, style: { stroke: "var(--color-fd-primary)", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: "var(--color-fd-primary)" } },
      { id: "e4", source: "action-email", target: "action-slack", animated: true, style: { stroke: "var(--color-fd-primary)", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: "var(--color-fd-primary)" } },
    ],
  },
  merchants: {
    nodes: [
      { id: "trigger-1", type: "trigger", position: { x: 50, y: 180 }, data: { label: "Payment Success", triggerType: "payment.success", status: "idle" } },
      { id: "action-hubspot", type: "action", position: { x: 300, y: 80 }, data: { label: "Update Contact", provider: "hubspot", status: "idle" } },
      { id: "action-slack", type: "action", position: { x: 300, y: 280 }, data: { label: "Notify Sales", provider: "slack", status: "idle" } },
      { id: "action-salesforce", type: "action", position: { x: 550, y: 180 }, data: { label: "Create Lead", provider: "salesforce", status: "idle" } },
    ],
    edges: [
      { id: "e1", source: "trigger-1", target: "action-hubspot", animated: true, style: { stroke: "var(--color-fd-primary)", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: "var(--color-fd-primary)" } },
      { id: "e2", source: "trigger-1", target: "action-slack", animated: true, style: { stroke: "var(--color-fd-primary)", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: "var(--color-fd-primary)" } },
      { id: "e3", source: "action-hubspot", target: "action-salesforce", animated: true, style: { stroke: "var(--color-fd-primary)", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: "var(--color-fd-primary)" } },
    ],
  },
  saas: {
    nodes: [
      { id: "trigger-1", type: "trigger", position: { x: 50, y: 180 }, data: { label: "Subscription Renewed", triggerType: "subscription.renewed", status: "idle" } },
      { id: "action-invoice", type: "action", position: { x: 300, y: 180 }, data: { label: "Send Invoice", provider: "resend", status: "idle" } },
      { id: "action-billing", type: "action", position: { x: 550, y: 180 }, data: { label: "Log Revenue", provider: "notion", status: "idle" } },
    ],
    edges: [
      { id: "e1", source: "trigger-1", target: "action-invoice", animated: true, style: { stroke: "var(--color-fd-primary)", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: "var(--color-fd-primary)" } },
      { id: "e2", source: "action-invoice", target: "action-billing", animated: true, style: { stroke: "var(--color-fd-primary)", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: "var(--color-fd-primary)" } },
    ],
  },
  risk: {
    nodes: [
      { id: "trigger-1", type: "trigger", position: { x: 50, y: 180 }, data: { label: "High Risk Score", triggerType: "high_risk_score", status: "idle" } },
      { id: "action-fraud", type: "action", position: { x: 300, y: 80 }, data: { label: "Fraud Check", provider: "fraud", status: "idle" } },
      { id: "action-pagerduty", type: "action", position: { x: 300, y: 280 }, data: { label: "Create Incident", provider: "pagerduty", status: "idle" } },
      { id: "action-security", type: "action", position: { x: 550, y: 180 }, data: { label: "Alert Security", provider: "slack", status: "idle" } },
    ],
    edges: [
      { id: "e1", source: "trigger-1", target: "action-fraud", animated: true, style: { stroke: "var(--color-fd-primary)", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: "var(--color-fd-primary)" } },
      { id: "e2", source: "trigger-1", target: "action-pagerduty", animated: true, style: { stroke: "var(--color-fd-primary)", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: "var(--color-fd-primary)" } },
      { id: "e3", source: "action-pagerduty", target: "action-security", animated: true, style: { stroke: "var(--color-fd-primary)", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: "var(--color-fd-primary)" } },
    ],
  },
  cart: {
    nodes: [
      { id: "trigger-1", type: "trigger", position: { x: 50, y: 180 }, data: { label: "Cart Abandoned", triggerType: "cart.abandoned", status: "idle" } },
      { id: "action-email", type: "action", position: { x: 300, y: 80 }, data: { label: "Recovery Email", provider: "resend", status: "idle" } },
      { id: "action-sms", type: "action", position: { x: 300, y: 280 }, data: { label: "Recovery SMS", provider: "twilio", status: "idle" } },
      { id: "action-hubspot", type: "action", position: { x: 550, y: 180 }, data: { label: "Update CRM", provider: "hubspot", status: "idle" } },
    ],
    edges: [
      { id: "e1", source: "trigger-1", target: "action-email", animated: true, style: { stroke: "var(--color-fd-primary)", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: "var(--color-fd-primary)" } },
      { id: "e2", source: "trigger-1", target: "action-sms", animated: true, style: { stroke: "var(--color-fd-primary)", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: "var(--color-fd-primary)" } },
      { id: "e3", source: "action-email", target: "action-hubspot", animated: true, style: { stroke: "var(--color-fd-primary)", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: "var(--color-fd-primary)" } },
    ],
  },
};

const WorkflowNode = ({ handles, className, status, children }: { handles: { target: boolean, source: boolean }, className?: string, status?: string, children: React.ReactNode }) => (
  <Card className={cn(
    "relative flex flex-col items-center justify-center rounded-xl border p-0 shadow-lg transition-all duration-200",
    status === "running" && "animate-pulse border-2 border-primary",
    status === "success" && "border-2 border-emerald-500",
    className
  )}>
    {handles.target && <Handle type="target" position={Position.Left} className="bg-muted-foreground border-background -left-1.5 h-3 w-3 border-2" />}
    {handles.source && <Handle type="source" position={Position.Right} className="bg-muted-foreground border-background -right-1.5 h-3 w-3 border-2" />}
    {children}
  </Card>
);

const NodeTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <h4 className={cn("text-[11px] font-bold leading-tight font-mono", className)}>{children}</h4>
);

const NodeDescription = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <p className={cn("text-muted-foreground text-[9px] font-mono", className)}>{children}</p>
);

const TriggerNode = ({ data, selected }: NodeProps) => {
  const status = data.status as string;
  return (
    <WorkflowNode
      handles={{ target: false, source: true }}
      status={status}
      className={cn("bg-linear-to-br from-blue-500/10 to-purple-500/10 w-40 h-32", selected && "border-primary")}
    >
      <div className="flex flex-col items-center gap-2 p-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-purple-600 shadow-lg">
          <Zap className="h-5 w-5 text-white" />
        </div>
        <div className="text-center">
          <NodeTitle>{data.label as string}</NodeTitle>
          <NodeDescription>Trigger</NodeDescription>
        </div>
      </div>
      {status === "success" && (
        <div className="absolute top-1.5 right-1.5 rounded-full bg-emerald-500 p-0.5">
          <Check className="h-2.5 w-2.5 text-white" />
        </div>
      )}
    </WorkflowNode>
  );
};

const ActionNode = ({ data, selected }: NodeProps) => {
  const status = data.status as string;
  return (
    <WorkflowNode
      handles={{ target: true, source: true }}
      status={status}
      className={cn("bg-card w-40 h-32", selected && "border-primary")}
    >
      <div className="flex flex-col items-center gap-2 p-3">
        <div className="bg-muted/50 flex h-10 w-10 items-center justify-center rounded-lg border shadow-sm">
          <TrendingUp className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="text-center">
          <NodeTitle>{data.label as string}</NodeTitle>
          <NodeDescription>{data.provider as string}</NodeDescription>
        </div>
      </div>
      {status === "success" && (
        <div className="absolute top-1.5 right-1.5 rounded-full bg-emerald-500 p-0.5">
          <Check className="h-2.5 w-2.5 text-white" />
        </div>
      )}
    </WorkflowNode>
  );
};

const nodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
};

interface ShowcaseProps {
  type: "payments" | "connections" | "routing" | "workflows" | "webhooks";
  title?: string;
  className?: string;
}

export function DocShowcase({ type, title, className }: ShowcaseProps) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-border bg-card shadow-xl my-8", className)}>
      {/* Browser Bar */}
      <div className="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-3">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
          </div>
          <div className="flex items-center gap-1.5 rounded bg-background/50 px-3 py-1 font-mono text-[10px] text-muted-foreground border border-border/50">
            <span className="opacity-40 select-none">https://</span>
            dashboard.reevit.io
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
            <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest font-bold">Live</span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-background/50">
        {type === "payments" && <PaymentsView />}
        {type === "connections" && <ConnectionsView />}
        {type === "routing" && <RoutingView />}
        {type === "workflows" && <WorkflowsView />}
        {type === "webhooks" && <WebhooksView />}
      </div>
    </div>
  );
}

function PaymentsView() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-mono text-2xl font-semibold tracking-tight">Snapshot</h1>
        <p className="text-muted-foreground font-mono text-sm">
          Payment overview for the last 30 days
        </p>
      </div>

      {/* Metric Cards Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Volume", value: "$429.8K", description: "from last period", change: "+12.5%", icon: DollarSign },
          { title: "Transactions", value: "2,704", description: "from last period", change: "+8.2%", icon: CreditCard },
          { title: "Success Rate", value: "96.8%", description: "from last period", change: "+0.3%", icon: Activity },
          { title: "Failed", value: "18", description: "transactions failed", change: null, icon: XCircle }
        ].map((stat, i) => (
          <Card key={i} className="gap-2 py-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
              <CardTitle className="text-muted-foreground font-mono text-xs font-medium tracking-wider uppercase">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="pt-0">
              <div className="font-mono text-2xl font-semibold tracking-tight">{stat.value}</div>
              {(stat.description || stat.change) && (
                <p className="text-muted-foreground mt-1 font-mono text-xs">
                  {stat.change && (
                    <span className="mr-1 text-emerald-600">
                      {stat.change}
                    </span>
                  )}
                  {stat.description}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>



      {/* Recent Payments Table Card */}
      <Card className="gap-4">
        <CardHeader className="pb-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-muted-foreground font-mono text-xs font-medium tracking-wider uppercase">
              Recent Payments
            </CardTitle>
            <div className="flex items-center gap-1 text-muted-foreground font-mono text-[10px] uppercase cursor-pointer hover:text-foreground transition-colors">
              View all
              <ArrowRight className="h-3 w-3" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/50">
                <th className="py-3 font-mono text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Payment ID</th>
                <th className="py-3 font-mono text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Amount</th>
                <th className="py-3 font-mono text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Status</th>
                <th className="py-3 font-mono text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Provider</th>
                <th className="py-3 font-mono text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Method</th>
                <th className="py-3 font-mono text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Fee</th>
                <th className="py-3 font-mono text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Attempts</th>
                <th className="py-3 font-mono text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {[
                { id: "pay_1a2b3c4d5e6...", amount: "GHS 150.00", status: "Succeeded", statusColor: "emerald", provider: "Paystack", method: "CARD", fee: "GHS 4.65", attempts: "1/1", time: "5 minutes ago" },
                { id: "pay_2b3c4d5e6f7...", amount: "GHS 500.00", status: "Pending", statusColor: "amber", provider: "Hubtel", method: "MOMO", fee: "GHS 7.50", attempts: "0/1", time: "15 minutes ago" },
                { id: "pay_3c4d5e6f7g8...", amount: "NGN 250.00", status: "Failed", statusColor: "red", provider: "Flutterwave", method: "CARD", fee: "NGN 0.00", attempts: "0/2", time: "30 minutes ago" },
                { id: "pay_4d5e6f7g8h9...", amount: "NGN 899.00", status: "Succeeded", statusColor: "emerald", provider: "Monnify", method: "CARD", fee: "NGN 22.47", attempts: "1/2", time: "about 1 hour ago" },
                { id: "pay_5e6f7g8h9i0...", amount: "NGN 1,200.00", status: "Requires Action", statusColor: "amber", provider: "Paystack", method: "BANK_TRANSFER", fee: "NGN 18.00", attempts: "0/1", time: "about 1 hour ago" }
              ].map((row, i) => (
                <tr key={i} className="group hover:bg-muted/30 transition-colors">
                  <td className="py-3 font-mono text-xs text-muted-foreground">{row.id}</td>
                  <td className="py-3 font-mono text-xs font-bold">{row.amount}</td>
                  <td className="py-3">
                    <span className={cn(
                      "rounded px-1.5 py-0.5 text-[10px] font-bold uppercase",
                      row.statusColor === "emerald" ? "bg-emerald-500/10 text-emerald-500" :
                        row.statusColor === "amber" ? "bg-amber-500/10 text-amber-500" :
                          "bg-red-500/10 text-red-500"
                    )}>
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                      <span className="font-mono text-xs font-medium">{row.provider}</span>
                    </div>
                  </td>
                  <td className="py-3 font-mono text-[10px] text-muted-foreground">{row.method}</td>
                  <td className="py-3 font-mono text-xs">{row.fee}</td>
                  <td className="py-3 font-mono text-xs">{row.attempts}</td>
                  <td className="py-3 font-mono text-xs text-muted-foreground">{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

function ConnectionsView() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Metrics Grid - 4 columns to match dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Connections", value: "4", description: "PSP integrations", icon: Link },
          { label: "Active", value: "3", description: "ready for transactions", icon: CheckCircle2 },
          { label: "Live Mode", value: "2", description: "production connections", icon: Globe },
          { label: "Avg Health", value: "98.9%", description: "across all connections", icon: TrendingUp }
        ].map((metric, i) => (
          <Card key={i} className="gap-2 py-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
              <CardTitle className="text-muted-foreground font-mono text-xs font-medium tracking-wider uppercase">
                {metric.label}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="pt-0">
              <div className="font-mono text-2xl font-semibold tracking-tight">{metric.value}</div>
              {metric.description && (
                <p className="text-muted-foreground mt-1 font-mono text-xs">{metric.description}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Connection Cards Grid - 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { name: "Paystack", status: "active", mode: "live", id: "conn_ps_gh_1a2b", health: 99.9, calls: 1234, latency: 145, methods: ["card", "momo"], countries: ["GH", "NG"], credentials: { secret_key: "sk_live_masked_1234abcd", public_key: "pk_live_masked_4321dcba" } },
          { name: "Hubtel", status: "active", mode: "sandbox", id: "conn_ht_gh_3c4d", health: 98.5, calls: 567, latency: 230, methods: ["momo"], countries: ["GH"], credentials: { client_id: "client_sandbox_1234", client_secret: "secret_sandbox_abcd" } },
        ].map((conn) => (
          <div key={conn.id} className="rounded-lg border border-border bg-card p-4 gap-4">
            {/* Header */}
            <div className="flex flex-row items-start justify-between space-y-0 pb-0 mb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-semibold">{conn.name}</span>
                  <span className={cn(
                    "rounded-full px-2 py-0.5 text-xs font-medium",
                    conn.status === "active" ? "bg-emerald-500/10 text-emerald-500" : "bg-muted text-muted-foreground"
                  )}>
                    {conn.status}
                  </span>
                  <span className={cn(
                    "rounded-full px-2 py-0.5 text-xs font-medium",
                    conn.mode === "live" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground border border-border"
                  )}>
                    {conn.mode}
                  </span>
                </div>
                <p className="text-muted-foreground font-mono text-xs">{conn.id}</p>
              </div>
            </div>

            {/* Health & Metrics */}
            <div className="border-border/50 flex items-center justify-between border-b pb-3 mb-3">
              <div className="flex items-center gap-3">
                <span className={cn(
                  "rounded-full px-2 py-0.5 text-xs font-medium",
                  conn.health >= 99 ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                )}>
                  {conn.health >= 99 ? "Healthy" : "Degraded"}
                </span>
                <span className="text-muted-foreground font-mono text-xs">
                  {conn.health}% success
                </span>
              </div>
              <div className="text-muted-foreground flex items-center gap-4 font-mono text-xs">
                <span>{conn.calls.toLocaleString()} calls</span>
                <span>{conn.latency}ms avg</span>
              </div>
            </div>

            {/* Capabilities */}
            <div className="flex items-center gap-4 text-xs mb-3">
              <div className="flex items-center gap-1.5">
                <span className="text-muted-foreground font-mono">Methods:</span>
                <div className="flex gap-1">
                  {conn.methods.map((method) => (
                    <span key={method} className="bg-muted rounded px-1.5 py-0 text-[10px] font-mono border border-border">
                      {method}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-muted-foreground font-mono">Countries:</span>
                <div className="flex gap-1">
                  {conn.countries.map((country) => (
                    <span key={country} className="bg-muted rounded px-1.5 py-0 text-[10px] font-mono border border-border">
                      {country}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Credentials */}
            <div className="border-border/50 space-y-2 border-t pt-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground font-mono text-xs font-medium tracking-wider uppercase">
                  Credentials
                </span>
              </div>
              <div className="space-y-1.5">
                {Object.entries(conn.credentials).map(([key, value]) => (
                  <div key={key} className="bg-muted/50 flex items-center justify-between rounded-sm px-2 py-1.5">
                    <div className="flex min-w-0 flex-1 items-center gap-2">
                      <span className="text-muted-foreground shrink-0 font-mono text-xs">
                        {key.replace(/_/g, " ")}:
                      </span>
                      <code className="truncate font-mono text-xs">
                        {value}
                      </code>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Provider Health Section */}
      <div className="space-y-3">
        <div className="text-[10px] font-bold text-muted-foreground uppercase px-1">Provider Health</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "Paystack", uptime: "99.99%", latency: "145ms", status: "Operational" },
            { name: "Flutterwave", uptime: "99.95%", latency: "210ms", status: "Operational" },
            { name: "Hubtel", uptime: "98.50%", latency: "450ms", status: "Degraded" }
          ].map((ps, i) => (
            <Card key={i} className="p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold">{ps.name}</span>
                <div className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  ps.status === "Operational" ? "bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]" : "bg-amber-500 shadow-[0_0_5px_rgba(245,158,11,0.5)]"
                )} />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
                <span>{ps.uptime}</span>
                <span>{ps.latency}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function RoutingView() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold">Smart Routing Rules</h3>
        <div className="flex items-center gap-2">
          <div className="text-[10px] text-muted-foreground font-mono">Priority Evaluation</div>
          <ArrowRight className="h-3 w-3 text-muted-foreground" />
        </div>
      </div>

      <div className="space-y-4">
        {[
          { name: "Ghana High-Priority", priority: 1, filters: "gh / mpesa,card", connection: "Paystack", active: true },
          { name: "Global Card Routing", priority: 2, filters: "any / card", connection: "Stripe", active: true },
          { name: "Failover: Hubtel", priority: 3, filters: "any / any", connection: "Hubtel", active: false },
        ].map((rule, i) => (
          <div key={i} className={cn(
            "relative overflow-hidden rounded-xl border p-4 space-y-3",
            rule.active ? "border-border bg-card" : "border-border/50 bg-muted/20 grayscale opacity-60"
          )}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-5 w-5 items-center justify-center rounded bg-muted border border-border text-[10px] font-bold font-mono">
                  {rule.priority}
                </div>
                <div className="text-xs font-bold">{rule.name}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
                <span className="text-[9px] font-mono text-muted-foreground">Active</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[10px]">
              <div className="flex grow items-center gap-2 rounded bg-muted/50 border border-border px-2 py-1.5">
                <Filter className="h-3 w-3 text-muted-foreground" />
                <span className="font-medium">{rule.filters}</span>
              </div>
              <ArrowRight className="h-3 w-3 text-muted-foreground" />
              <div className="flex grow items-center gap-2 rounded bg-primary/5 border border-primary/20 px-2 py-1.5 text-primary">
                <Database className="h-3 w-3" />
                <span className="font-bold">{rule.connection}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkflowShowcaseInner() {
  const [activeTab, setActiveTab] = React.useState("ecommerce");
  const currentConfig = React.useMemo(() => WORKFLOW_CONFIGS[activeTab], [activeTab]);

  const [nodes, setNodes, onNodesChange] = useNodesState(currentConfig.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(currentConfig.edges);
  const [isSimulating, setIsSimulating] = React.useState(false);

  React.useEffect(() => {
    setNodes(currentConfig.nodes);
    setEdges(currentConfig.edges);
  }, [activeTab, setNodes, setEdges, currentConfig]);

  const runSimulation = async () => {
    if (isSimulating) return;
    setIsSimulating(true);

    // Reset nodes
    setNodes((nds) => nds.map((n) => ({ ...n, data: { ...n.data, status: "idle" } })));

    // Step 1: Trigger fires
    setNodes((nds) => nds.map((n) => n.id === "trigger-1" ? { ...n, data: { ...n.data, status: "running" } } : n));
    await new Promise((r) => setTimeout(r, 600));
    setNodes((nds) => nds.map((n) => n.id === "trigger-1" ? { ...n, data: { ...n.data, status: "success" } } : n));

    // Step 2: Sequential actions
    const actions = nodes.filter(n => n.type === "action");
    for (const action of actions) {
      setNodes((nds) => nds.map((n) => n.id === action.id ? { ...n, data: { ...n.data, status: "running" } } : n));
      await new Promise((r) => setTimeout(r, 800));
      setNodes((nds) => nds.map((n) => n.id === action.id ? { ...n, data: { ...n.data, status: "success" } } : n));
    }

    await new Promise((r) => setTimeout(r, 1000));
    setIsSimulating(false);
    setNodes((nds) => nds.map((n) => ({ ...n, data: { ...n.data, status: "idle" } })));
  };

  const activeTabInfo = WORKFLOW_TABS.find((t) => t.id === activeTab)!;

  return (
    <div className="p-4 md:p-6">
      {/* Browser-style frame */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[rgb(23,23,23)] shadow-2xl">
        {/* Top Bar */}
        <div className="flex items-center justify-between border-b border-white/5 bg-white/5 px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
              <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
            </div>
            <span className="ml-2 font-mono text-[10px] text-gray-500">Workflow Canvas</span>
          </div>
          <Sparkles className="h-3 w-3 text-gray-500" />
        </div>

        <div className="p-4">
          {/* Tabs */}
          <div className="mb-4 flex flex-wrap gap-1.5">
            {WORKFLOW_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => !isSimulating && setActiveTab(tab.id)}
                  disabled={isSimulating}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-1.5 font-mono text-[10px] font-medium transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-white/5 text-gray-400 hover:bg-white/10",
                    isSimulating && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <Icon className="h-3 w-3" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Flow Area */}
          <div className="relative h-[350px] overflow-hidden rounded-xl border border-white/5 bg-black/40">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              fitView
              fitViewOptions={{ padding: 0.2 }}
              proOptions={{ hideAttribution: true }}
              className="bg-transparent"
            >
              <Background color="#ffffff" gap={20} size={0.5} className="opacity-[0.03]" />

              <Panel position="top-right" className="p-2">
                <Button
                  size="sm"
                  onClick={runSimulation}
                  disabled={isSimulating}
                  className="h-7 px-3 text-[10px] bg-primary hover:bg-primary/90"
                >
                  {isSimulating ? (
                    <span className="flex items-center gap-1.5">
                      <div className="h-2 w-2 animate-spin rounded-full border border-white/30 border-t-white" />
                      Simulating...
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <Play className="h-3 w-3" />
                      Run Live Flow
                    </span>
                  )}
                </Button>
              </Panel>

              <Panel position="bottom-left" className="m-4">
                <div className="max-w-[240px] rounded-xl border border-white/10 bg-black/60 p-3 shadow-2xl backdrop-blur-md">
                  <div className="text-primary mb-1 flex items-center gap-2">
                    <Sparkles className="h-2.5 w-2.5" />
                    <span className="font-mono text-[9px] font-bold tracking-widest uppercase">
                      {activeTabInfo.panelTitle}
                    </span>
                  </div>
                  <p className="text-muted-foreground font-mono text-[9px] leading-relaxed">
                    {activeTabInfo.panelDescription}
                  </p>
                </div>
              </Panel>
            </ReactFlow>
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkflowsView() {
  return (
    <ReactFlowProvider>
      <WorkflowShowcaseInner />
    </ReactFlowProvider>
  );
}

function WebhooksView() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Config Cards - 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Endpoint Card */}
        <Card>
          <CardHeader>
            <CardTitle className="font-mono text-sm font-medium">Webhook Endpoint</CardTitle>
            <CardDescription className="font-mono text-xs">
              Configure where Reevit sends webhook events
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-muted-foreground font-mono text-xs font-medium tracking-wider uppercase">
                Endpoint URL
              </label>
              <div className="bg-muted/50 flex items-center gap-2 rounded-sm p-2 font-mono text-xs">
                <span className="text-emerald-500">HTTPS</span>
                <span className="truncate">yourapp.com/webhooks</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Signing Secret Card */}
        <Card>
          <CardHeader>
            <CardTitle className="font-mono text-sm font-medium">Signing Secret</CardTitle>
            <CardDescription className="font-mono text-xs">
              Use this secret to verify webhook signatures
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-muted-foreground font-mono text-xs font-medium tracking-wider uppercase">
                Secret Key
              </label>
              <div className="bg-muted/50 flex items-center justify-between rounded-sm p-2 font-mono text-xs">
                <span>whsec_9l2k...••••••••••••••••</span>
                <Terminal className="h-3 w-3 opacity-30" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subscribed Events Card */}
      <Card>
        <CardHeader>
          <CardTitle className="font-mono text-sm font-medium">Subscribed Events</CardTitle>
          <CardDescription className="font-mono text-xs">
            Events currently being sent to your endpoint
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {["payment.succeeded", "payment.failed", "subscription.created", "subscription.cancelled", "payout.completed"].map((event) => (
              <span key={event} className="bg-muted rounded px-2 py-1 font-mono text-[10px] border border-border">
                {event}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Events */}
      <div className="space-y-3">
        <div className="text-[10px] font-bold text-muted-foreground uppercase px-1">Recent Events</div>
        <div className="space-y-2">
          {[
            { event: "payment.succeeded", code: 200, time: "Just now" },
            { event: "subscription.created", code: 200, time: "3m ago" },
            { event: "payment.failed", code: 500, time: "10m ago" }
          ].map((log, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border border-border/50 bg-card/50 p-2.5">
              <div className="flex items-center gap-3">
                <div className={cn("h-1.5 w-1.5 rounded-full", log.code === 200 ? "bg-emerald-500" : "bg-red-500")} />
                <div className="text-[10px] font-medium font-mono">{log.event}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] text-muted-foreground">{log.time}</span>
                <div className={cn(
                  "rounded px-1 text-[8px] font-bold",
                  log.code === 200 ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                )}>{log.code}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
