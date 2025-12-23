"use client";

import { useCallback, useRef } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  useNodesState,
  useEdgesState,
  Panel,
  useReactFlow,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/base.css";
import { PlusSignIcon as Plus, MinusSignIcon as Minus, MaximizeIcon as Maximize2 } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/components/ui/button";
import TableNode from "@/components/schema/table-node";
import SchemaEdge from "@/components/schema/schema-edge";
import { initialNodes, initialEdges } from "@/lib/schema-data";

// Register custom node types and edge types
const nodeTypes = {
  tableNode: TableNode,
};

const edgeTypes = {
  custom: SchemaEdge,
};

function SchemaVisualizerInner() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { fitView, zoomIn, zoomOut } = useReactFlow();

  const onFitView = useCallback(() => {
    fitView({
      padding: 0.1,
      minZoom: 0.1,
      maxZoom: 1,
      duration: 800
    });
  }, [fitView]);

  return (
    <main className="flex-1 flex items-stretch">
      <div className="w-full" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          minZoom={0.1}
          maxZoom={4}
          defaultEdgeOptions={{
            type: "custom",
            style: { strokeWidth: 1.5, stroke: 'var(--foreground)' },
            className: "opacity-40",
          }}
          style={
            {
              "--xy-background-pattern-dots-color-default":
                "var(--color-border)",
              "--xy-edge-stroke-width-default": 1.5,
              "--xy-edge-stroke-default": "var(--color-foreground)",
              "--xy-edge-stroke-selected-default": "var(--color-foreground)",
              "--xy-attribution-background-color-default": "transparent",
            } as React.CSSProperties
          }
          attributionPosition="bottom-left"
        >
          <Background variant={BackgroundVariant.Dots} gap={20} size={2} />

          <Panel
            position="bottom-right"
            className="inline-flex -space-x-px rounded-md shadow-xs rtl:space-x-reverse"
          >
            <Button
              variant="outline"
              size="icon"
              className="text-muted-foreground/80 hover:text-muted-foreground rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg size-10 focus-visible:z-10 bg-card"
              onClick={() => zoomIn()}
              aria-label="Zoom in"
            >
              <HugeiconsIcon icon={Plus} className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="text-muted-foreground/80 hover:text-muted-foreground rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg size-10 focus-visible:z-10 bg-card"
              onClick={() => zoomOut()}
              aria-label="Zoom out"
            >
              <HugeiconsIcon icon={Minus} className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="text-muted-foreground/80 hover:text-muted-foreground rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg size-10 focus-visible:z-10 bg-card"
              onClick={onFitView}
              aria-label="Fit view"
            >
              <HugeiconsIcon icon={Maximize2} className="h-4 w-4" />
            </Button>
          </Panel>
        </ReactFlow>
      </div>
    </main>
  );
}

export default function SchemaVisualizer() {
  return (
    <ReactFlowProvider>
      <SchemaVisualizerInner />
    </ReactFlowProvider>
  );
}