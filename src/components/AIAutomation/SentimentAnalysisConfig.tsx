import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Slider,
  Chip
} from '@mui/material';

interface SentimentAnalysisConfigProps {
  sentimentThreshold: number;
  onSentimentThresholdChange: (threshold: number) => void;
}

const SentimentAnalysisConfig: React.FC<SentimentAnalysisConfigProps> = ({
  sentimentThreshold,
  onSentimentThresholdChange
}) => {
  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 2 }}>
        Configure Sentiment Analysis
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Set the threshold for determining positive or negative sentiment (0 = highly negative, 1 = highly positive)
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography>Threshold:</Typography>
        <Box sx={{ flex: 1 }}>
          <Slider
            value={sentimentThreshold}
            onChange={(_e: Event, value: number | number[]) => 
              onSentimentThresholdChange(Array.isArray(value) ? value[0] : value)
            }
            step={0.05}
            marks
            min={0}
            max={1}
            valueLabelDisplay="auto"
          />
        </Box>
        <Box sx={{ width: 80 }}>
          <TextField
            size="small"
            type="number"
            value={sentimentThreshold}
            onChange={(e) => onSentimentThresholdChange(Number(e.target.value))}
            inputProps={{ step: 0.05, min: 0, max: 1 }}
          />
        </Box>
      </Box>
      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        <Chip 
          label="Negative" 
          color={sentimentThreshold >= 0.5 ? "default" : "error"} 
          variant={sentimentThreshold >= 0.5 ? "outlined" : "filled"}
        />
        <Chip 
          label="Neutral" 
          color={Math.abs(sentimentThreshold - 0.5) <= 0.1 ? "primary" : "default"} 
          variant={Math.abs(sentimentThreshold - 0.5) <= 0.1 ? "filled" : "outlined"}
        />
        <Chip 
          label="Positive" 
          color={sentimentThreshold < 0.5 ? "default" : "success"} 
          variant={sentimentThreshold < 0.5 ? "outlined" : "filled"}
        />
      </Box>
    </Box>
  );
};

export default SentimentAnalysisConfig;
