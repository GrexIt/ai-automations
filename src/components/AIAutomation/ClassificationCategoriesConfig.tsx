import React from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface ClassificationCategoriesConfigProps {
  categories: string[];
  onCategoriesChange: (categories: string[]) => void;
}

const ClassificationCategoriesConfig: React.FC<ClassificationCategoriesConfigProps> = ({
  categories,
  onCategoriesChange
}) => {
  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 2 }}>
        Configure Classification Categories
      </Typography>
      {categories.map((category, index) => (
        <Box key={index} sx={{ display: 'flex', mb: 2, gap: 1 }}>
          <TextField
            fullWidth
            size="small"
            label={`Category ${index + 1}`}
            placeholder="e.g., Complaint, Inquiry, Feedback"
            value={category}
            onChange={(e) => {
              const newCategories = [...categories];
              newCategories[index] = e.target.value;
              onCategoriesChange(newCategories);
            }}
          />
          {categories.length > 1 && (
            <IconButton 
              color="error"
              onClick={() => {
                const newCategories = categories.filter((_, i) => i !== index);
                onCategoriesChange(newCategories);
              }}
            >
              <DeleteOutlineIcon />
            </IconButton>
          )}
        </Box>
      ))}
      <Button 
        startIcon={<AddIcon />}
        onClick={() => onCategoriesChange([...categories, ''])}
      >
        Add Category
      </Button>
    </Box>
  );
};

export default ClassificationCategoriesConfig;
