# Industrial Process Control System - Project Overview

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture & Technology Stack](#architecture--technology-stack)
3. [Directory Structure](#directory-structure)
4. [Component Hierarchy](#component-hierarchy)
5. [Data Flow](#data-flow)
6. [Key Components](#key-components)
7. [User Interface Features](#user-interface-features)
8. [System Integration](#system-integration)

## Project Overview

This is a **Next.js-based Industrial Process Control System** that provides AI-powered process variable control capabilities. The system offers two main operational modes:

1. **Single Parameter Control** - Controls one process variable at a time
2. **Multi-Parameter Control** - Manages multiple interconnected process parameters simultaneously

The application simulates industrial control scenarios commonly found in manufacturing, chemical processing, or mining operations.

## Architecture & Technology Stack

### Core Framework
- **Next.js 15.2.4** - React-based full-stack framework with App Router
- **TypeScript** - Type-safe JavaScript for better code quality
- **React 18** - Component-based UI library

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **Recharts** - Charting library for data visualization

### State Management
- **React Hooks** - useState, useEffect for local state management
- **Real-time Simulation** - setInterval for continuous data updates

## Directory Structure

```
industrial-process-control/
├── app/                          # Next.js App Router pages
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout with navigation
│   ├── page.tsx                 # Home page (Single Parameter)
│   └── multi-parameter/
│       └── page.tsx             # Multi-parameter page
├── components/                   # React components
│   ├── ui/                      # Reusable UI components (50 files)
│   ├── process-control-dashboard.tsx     # Main single parameter dashboard
│   ├── multi-parameter-control-dashboard.tsx  # Multi-parameter dashboard
│   ├── process-parameter-card.tsx        # Individual parameter control card
│   ├── fraction-main-display.tsx         # Fraction separation display
│   ├── vertical-gauge.tsx               # Gauge visualization
│   ├── process-trend-chart.tsx          # Real-time trending charts
│   ├── convergence-indicator.tsx        # AI convergence status
│   └── theme-provider.tsx              # Dark/light theme support
├── hooks/                       # Custom React hooks
│   ├── use-mobile.tsx          # Mobile device detection
│   └── use-toast.ts            # Toast notification system
├── lib/                        # Utility libraries
│   └── utils.ts               # Common utility functions
├── styles/                     # Additional styling
├── public/                     # Static assets
└── Configuration files (package.json, tsconfig.json, etc.)
```

## Component Hierarchy

### Application Structure
```
RootLayout (app/layout.tsx)
├── Navigation Bar
│   ├── "Process Control System" Title
│   └── Navigation Links
│       ├── "Single Parameter" → /
│       └── "Multi Parameter" → /multi-parameter
├── ThemeProvider (Dark/Light mode)
└── Page Content
    ├── Home (app/page.tsx)
    │   └── ProcessControlDashboard
    └── Multi-Parameter (app/multi-parameter/page.tsx)
        └── MultiParameterControlDashboard
```

### Dashboard Components Breakdown

#### Single Parameter Dashboard (ProcessControlDashboard)
```
ProcessControlDashboard
├── Control Panel Card
│   ├── AI Toggle Switch
│   ├── Manual Setpoint Input
│   └── Setpoint Limits Sliders
├── Current Values Card
│   ├── Process Variable (PV)
│   ├── Setpoint (SP)
│   └── Status Badges
├── Real-time Trend Chart
│   └── ProcessTrendChart
├── Vertical Process Gauge
│   └── VerticalGauge
└── AI Convergence Indicator
    └── ConvergenceIndicator
```

#### Multi-Parameter Dashboard (MultiParameterControlDashboard)
```
MultiParameterControlDashboard
├── System Status Card
│   ├── AI Optimization Status
│   └── Overall Performance Metrics
├── Fraction Main Display
│   └── FractionMainDisplay (ore separation visualization)
├── Parameter Grid (4x2 layout)
│   ├── ProcessParameterCard (Ore Feed Rate)
│   ├── ProcessParameterCard (Water Mill)
│   ├── ProcessParameterCard (Reagent Flow)
│   ├── ProcessParameterCard (pH Level)
│   ├── ProcessParameterCard (Temperature)
│   ├── ProcessParameterCard (Pressure)
│   ├── ProcessParameterCard (Agitation Speed)
│   └── ProcessParameterCard (Air Flow)
```

### UI Component Library Structure
The `components/ui/` directory contains 50+ reusable components including:
- Form controls (button, input, slider, switch, select)
- Layout components (card, separator, tabs, accordion)
- Feedback components (alert, toast, badge, progress)
- Navigation components (menubar, dropdown, context-menu)
- Data display (table, tooltip, popover)

## Data Flow

### 1. Single Parameter Control Flow
```
User Input → State Update → AI Processing → Process Simulation → UI Update
     ↓           ↓              ↓               ↓              ↓
[Manual SP] → [manualSP] → [aiEnabled] → [currentPV] → [Visual Display]
[AI Toggle] → [aiEnabled] → [AI SP Calc] → [Process Lag] → [Real-time Chart]
[Limits]    → [spLimits]  → [Boundary Check] → [PV Update] → [Gauge Update]
```

### 2. Multi-Parameter Control Flow
```
8 Parameters → Individual Control → Interdependency → Fraction Output
     ↓              ↓                    ↓               ↓
[Ore Feed] → [Parameter Card] → [Cross-coupling] → [Separation %]
[Water Mill]→ [Trend Charts]  → [AI Optimization]→ [Recovery Rate]
[Reagents] → [Limit Checking]→ [System Balance]→ [Quality Metrics]
[pH/Temp]  → [Status Updates]→ [Performance]  → [Main Display]
```

### 3. Real-time Data Simulation
```javascript
setInterval(() => {
  // Generate AI setpoints
  const aiSp = aiEnabled ? calculateAISetpoint() : manualSP
  
  // Simulate process response (with lag and noise)
  const error = aiSp - currentPV
  const newPV = currentPV + error * 0.1 + noise
  
  // Update historical data
  setProcessData(prev => [...prev, newDataPoint])
  
  // Trigger UI updates
  setCurrentPV(newPV)
  setCurrentSP(aiSp)
}, 1000) // Updates every second
```

## Key Components

### 1. ProcessControlDashboard
**Purpose**: Main single-parameter control interface
- **State Management**: 6 useState hooks for real-time data
- **AI Logic**: Simulated AI setpoint calculation with limits
- **Real-time Updates**: 1000ms interval for continuous simulation
- **User Controls**: Manual/Auto mode, setpoint limits, manual setpoint

### 2. MultiParameterControlDashboard
**Purpose**: Complex multi-variable control system
- **Parameter Management**: 8 interconnected process variables
- **Fraction Processing**: Ore separation simulation with recovery metrics
- **Cross-coupling**: Parameters influence each other realistically
- **Performance Monitoring**: Overall system efficiency tracking

### 3. ProcessParameterCard
**Purpose**: Individual parameter control and monitoring
- **Mini-trend Chart**: Historical data visualization
- **Real-time Values**: PV, SP display with status indicators
- **Interactive Controls**: Setpoint adjustment sliders
- **Status Monitoring**: Error calculation and limit checking

### 4. FractionMainDisplay
**Purpose**: Visual representation of ore separation process
- **Recovery Metrics**: Real-time fraction percentages
- **Quality Indicators**: Product quality measurements
- **Performance Trends**: Historical recovery data
- **Optimization Status**: AI-driven improvement indicators

### 5. ProcessTrendChart & VerticalGauge
**Purpose**: Data visualization components
- **Real-time Plotting**: Continuous data streaming
- **Multi-series Charts**: PV, SP, AI SP tracking
- **Responsive Design**: Adapts to different screen sizes
- **Interactive Features**: Hover details, zoom capabilities

## User Interface Features

### Navigation & Layout
- **Responsive Design**: Mobile and desktop optimized
- **Dark/Light Theme**: System-aware theme switching
- **Sticky Navigation**: Always accessible page switching
- **Gradient Backgrounds**: Modern industrial aesthetic

### Control Interfaces
- **Slider Controls**: Intuitive setpoint and limit adjustment
- **Toggle Switches**: AI enable/disable functionality
- **Input Fields**: Precise manual value entry
- **Status Badges**: Real-time system status indicators

### Data Visualization
- **Real-time Charts**: Continuously updating trend lines
- **Gauge Displays**: Industrial-style process indicators
- **Color-coded Status**: Green/yellow/red status indicators
- **Animated Transitions**: Smooth value changes

### Feedback Systems
- **Convergence Indicators**: AI optimization status
- **Error Displays**: Process deviation warnings
- **Performance Metrics**: System efficiency indicators
- **Toast Notifications**: System alerts and confirmations

## System Integration

### Component Communication
- **Props Flow**: Parent-to-child data passing
- **Callback Functions**: Child-to-parent event handling
- **State Lifting**: Shared state management at appropriate levels
- **Context Providers**: Theme and global state management

### Data Management
- **Simulated Backend**: In-memory data generation
- **Real-time Updates**: Interval-based data refresh
- **Historical Data**: Sliding window data retention
- **State Persistence**: Session-based data maintenance

### Performance Optimization
- **Component Memoization**: Preventing unnecessary re-renders
- **Data Chunking**: Limited historical data sets
- **Responsive Charts**: Efficient data visualization
- **Lazy Loading**: Component-based code splitting

### Future Integration Points
- **WebSocket Support**: Real-time data from actual PLCs
- **Database Integration**: Historical data persistence
- **Authentication**: User access control
- **Alarm Management**: Critical event handling
- **Reporting**: Data export and analysis features

---

This system demonstrates modern industrial HMI (Human-Machine Interface) design patterns using cutting-edge web technologies, providing a foundation for real-world process control applications.
