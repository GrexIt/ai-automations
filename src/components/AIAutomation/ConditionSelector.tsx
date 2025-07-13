import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  MenuItem,
  Select,
  FormControl,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export interface ConditionGroup {
  type: 'AND' | 'OR';
  conditions: Condition[];
}

export interface Condition {
  id: string;
  type: string;
  value: string;
}

interface ConditionSelectorProps {
  conditions: Condition[];
  onConditionsChange: (conditions: Condition[]) => void;
  compactInputStyles?: React.CSSProperties;
}

const ConditionSelector: React.FC<ConditionSelectorProps> = ({ 
  conditions, 
  onConditionsChange,
  compactInputStyles = {}
}) => {
  // Handle adding a condition
  const handleAddCondition = (type: 'AND' | 'OR') => {
    const newCondition: Condition = {
      id: `condition-${Date.now()}`,
      type: '',
      value: ''
    };
    
    onConditionsChange([...conditions, newCondition]);
  };

  // Handle removing a condition
  const handleRemoveCondition = (id: string) => {
    onConditionsChange(conditions.filter(condition => condition.id !== id));
  };

  // Handle condition type change
  const handleConditionTypeChange = (index: number, value: string) => {
    const updatedConditions = [...conditions];
    updatedConditions[index] = {
      ...updatedConditions[index],
      type: value
    };
    onConditionsChange(updatedConditions);
  };

  return (
    <Box sx={{ bgcolor: '#f5f8ff', p: 2, borderRadius: 2 }}>
      {conditions.length === 0 ? (
        <FormControl fullWidth variant="outlined" sx={{ mb: 1 }}>
          <Select
            value=""
            displayEmpty
            renderValue={() => "Select condition"}
            sx={{ 
              ...compactInputStyles,
              backgroundColor: 'white'
            }}
          >
            <MenuItem value="subject_contains">Subject contains</MenuItem>
            <MenuItem value="from_email">From email</MenuItem>
            <MenuItem value="body_contains">Body contains</MenuItem>
          </Select>
        </FormControl>
      ) : (
        <Box>
          {conditions.map((condition, index) => (
            <Box 
              key={condition.id} 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 1 
              }}
            >
              <FormControl variant="outlined" sx={{ flexGrow: 1 }}>
                <Select
                  value={condition.type}
                  onChange={(e) => handleConditionTypeChange(index, e.target.value)}
                  displayEmpty
                  renderValue={() => condition.type || "Select condition"}
                  sx={{ 
                    ...compactInputStyles,
                    backgroundColor: 'white'
                  }}
                >
                  <MenuItem value="subject_contains">Subject contains</MenuItem>
                  <MenuItem value="from_email">From email</MenuItem>
                  <MenuItem value="body_contains">Body contains</MenuItem>
                </Select>
              </FormControl>
              <IconButton 
                size="small" 
                onClick={() => handleRemoveCondition(condition.id)}
                sx={{ ml: 1 }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button 
          startIcon={<AddIcon />} 
          color="primary" 
          onClick={() => handleAddCondition('OR')}
          sx={{ 
            textTransform: 'none', 
            borderRadius: 8, 
            fontWeight: 'normal',
            mr: 2
          }}
        >
          OR CONDITION
        </Button>
        <Button
          startIcon={<AddIcon />} 
          color="primary" 
          onClick={() => handleAddCondition('AND')}
          sx={{ 
            textTransform: 'none', 
            borderRadius: 8, 
            fontWeight: 'normal' 
          }}
        >
          + AND CONDITION
        </Button>
      </Box>
    </Box>
  );
};

export default ConditionSelector;
