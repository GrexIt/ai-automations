import React from 'react';
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  Button,
  SelectChangeEvent
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { compactInputStyles } from './styles/formStyles';

interface StandardActionSelectorProps {
  standardAction: string;
  setStandardAction: (value: string) => void;
}

const StandardActionSelector: React.FC<StandardActionSelectorProps> = ({
  standardAction,
  setStandardAction
}) => {
  const handleActionChange = (e: SelectChangeEvent<string>) => {
    setStandardAction(e.target.value);
  };

  return (
    <Box 
      sx={{ 
        backgroundColor: '#f5f8ff', 
        borderRadius: 1, 
        p: 1.5 
      }}
    >
      <FormControl fullWidth variant="outlined" sx={{ mb: 0.7 }}>
        <Select
          value={standardAction}
          onChange={handleActionChange}
          displayEmpty
          renderValue={() => "Select action"}
          sx={{ 
            ...compactInputStyles,
            backgroundColor: 'white'
          }}
        >
          <MenuItem value="send_email">Send email</MenuItem>
          <MenuItem value="add_label">Add label</MenuItem>
          <MenuItem value="assign_to">Assign to</MenuItem>
          <MenuItem value="create_task">Create task</MenuItem>
        </Select>
      </FormControl>
      
      <Button
        variant="outlined"
        color="primary"
        startIcon={<AddIcon />}
        sx={{ mt: 1.5, width: '100%', borderStyle: 'dashed' }}
      >
        + Add another action
      </Button>
    </Box>
  );
};

export default StandardActionSelector;
