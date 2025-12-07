export interface EngineeringMilestone {
  title: string;
  dueDate: string;
  completed?: boolean;
}

export interface EngineeringProject {
  id: number;
  code: string;
  title: string;
  clientName: string;
  startDate: string;
  endDate?: string;
  status: 'planned' | 'in_progress' | 'on_hold' | 'completed' | 'cancelled';
  budget?: number;
  projectManager?: string;
  milestones?: EngineeringMilestone[];
}
