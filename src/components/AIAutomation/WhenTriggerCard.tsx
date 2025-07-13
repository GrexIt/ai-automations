import React from 'react';
import {
  Box,
  Typography,
  Card,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import { compactInputStyles } from './styles/formStyles';

interface WhenTriggerCardProps {
  triggerType: string;
  setTriggerType: (value: string) => void;
}

const WhenTriggerCard: React.FC<WhenTriggerCardProps> = ({
  triggerType,
  setTriggerType
}) => {
  const handleTriggerChange = (e: SelectChangeEvent<string>) => {
    setTriggerType(e.target.value);
  };

  return (
    <Card variant="outlined" sx={{ mb: 3, p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <EventIcon color="primary" sx={{ mr: 2 }} />
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>When</Typography>
      </Box>
      
      <Box sx={{ pl: 5 }}>
        <FormControl fullWidth variant="outlined">
          <Select
            value={triggerType}
            onChange={handleTriggerChange}
            displayEmpty
            renderValue={() => "New conversation (inbound) is received"}
            sx={{ 
              ...compactInputStyles,
              '& .MuiSelect-select': { 
                display: 'flex', 
                alignItems: 'center'
              }
            }}
          >
            <MenuItem value="new_conversation">New conversation (inbound) is received</MenuItem>
            <MenuItem value="outbound_email">Outbound email is sent</MenuItem>
            <MenuItem value="tag_added">Tag is added</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Card>
  );
};

export default WhenTriggerCard;
