import React from 'react';
import {
  Box,
  Typography,
  Card,
  Collapse,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AIAssist from './AIAssist';
import { compactInputStyles } from './styles/formStyles';

interface AIInsight {
  suggestions: string[];
  optimizations: string[];
}

interface AIInsightsPanelProps {
  isInsightsPanelExpanded: boolean;
  setIsInsightsPanelExpanded: (expanded: boolean) => void;
}

// AI insights data for the automation
const aiInsights = {
  suggestions: [
    "Adding sentiment analysis could improve response priority",
    "Consider extracting customer intent for better routing",
    "This automation could benefit from classification of request type"
  ],
  optimizations: [
    "AI extraction would be 85% faster than manual review",
    "Similar automations have reduced response time by 37%"
  ]
};


const AIInsightsPanel: React.FC<AIInsightsPanelProps> = ({
  isInsightsPanelExpanded,
  setIsInsightsPanelExpanded,
}) => {
  return (
    <Box 
      sx={{ 
        width: '300px', 
        display: { xs: 'none', md: 'block' } 
      }}
    >
      <Card variant="outlined" sx={{ position: 'sticky', top: 16 }}>
        {/* AI Insights Header - Always visible */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center', 
            p: 2,
            cursor: 'pointer',
            backgroundColor: isInsightsPanelExpanded ? '#f9fafc' : 'transparent',
            '&:hover': { backgroundColor: '#f9fafc' }
          }}
          onClick={() => setIsInsightsPanelExpanded(!isInsightsPanelExpanded)}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ 
              display: 'inline-flex',
              borderRadius: '50%',
              backgroundColor: '#f0f4ff',
              p: 1,
              mr: 1
            }}>
              <AutoAwesomeIcon color="primary" fontSize="small" />
            </Box>
            <Box>
              <Typography variant="h6">AI Insights</Typography>
              {!isInsightsPanelExpanded && (
                <Typography variant="caption" color="text.secondary">
                  {aiInsights.suggestions.length + aiInsights.optimizations.length} insights available
                </Typography>
              )}
            </Box>
          </Box>
          {isInsightsPanelExpanded ? 
            <ExpandLessIcon color="action" /> : 
            <ExpandMoreIcon color="action" />
          }
        </Box>
        
        {/* Collapsible content */}
        <Collapse in={isInsightsPanelExpanded}>
          <Box sx={{ p: 2, pt: 0 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, mt: 2, color: 'text.secondary' }}>Suggestions</Typography>
            <List dense sx={{ pl: 0 }}>
              {aiInsights.suggestions.map((suggestion, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    <AutoAwesomeIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={suggestion} primaryTypographyProps={{ variant: 'body2' }} />
                </ListItem>
              ))}
            </List>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>Optimizations</Typography>
            <List dense sx={{ pl: 0 }}>
              {aiInsights.optimizations.map((optimization, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    <CheckCircleIcon color="success" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={optimization} primaryTypographyProps={{ variant: 'body2' }} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Collapse>
      </Card>
      
      {/* AI Assist Chat Component */}
      <AIAssist compactInputStyles={compactInputStyles} />
    </Box>
  );
};

export default AIInsightsPanel;
