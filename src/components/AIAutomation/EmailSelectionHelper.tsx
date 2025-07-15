import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Chip,
  CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EmailIcon from '@mui/icons-material/Email';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

export interface Email {
  id: string;
  subject: string;
  from: string;
  date: string;
  selected: boolean;
}

interface EmailSelectionHelperProps {
  extractionFields: Array<{
    name: string;
    description: string;
    examples: string;
  }>;
  selectedEmails: Email[];
  onSelectedEmailsChange: (emails: Email[]) => void;
  minRequiredEmails?: number;
}

const EmailSelectionHelper: React.FC<EmailSelectionHelperProps> = ({
  extractionFields,
  selectedEmails,
  onSelectedEmailsChange,
  minRequiredEmails = 5
}) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Email[]>([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = () => {
    // In a real implementation, this would call an API to search emails
    setIsSearching(true);
    
    // Mock search results with random data - always return results for better demo
    setTimeout(() => {
      // Generate mock emails that contain extraction field information
      const mockResults = Array(Math.floor(Math.random() * 5) + 5)
        .fill(null)
        .map((_, i) => {
          // Generate sample content based on extraction fields to make results seem related
          const extractionContent = extractionFields.map(field => {
            const fieldName = field.name.toLowerCase();
            const value = fieldName.includes('order') ? `ORD-${100000 + i}` : 
                      fieldName.includes('invoice') ? `INV-${200000 + i}` : 
                      fieldName.includes('customer') ? `Customer ${['John', 'Alice', 'Bob', 'Sarah'][i % 4]} ${['Smith', 'Johnson', 'Williams', 'Jones'][Math.floor(i/4)]}` :
                      `Sample ${field.name} ${i+1}`;
            return `${field.name}: ${value}`;
          }).join(' | ');
          
          return {
            id: `email-${Date.now()}-${i}`,
            subject: searchQuery ? `RE: ${searchQuery} - ${extractionContent.slice(0, 30)}...` : `Business request #${i+1}`,
            from: `customer${i+1}@example.com`,
            date: new Date(Date.now() - i * 86400000).toLocaleDateString(),
            selected: false
          };
        });
      
      setSearchResults(mockResults);
      // Mark emails that are already selected
      const updatedResults = mockResults.map(email => ({
        ...email,
        selected: selectedEmails.some(selected => selected.id === email.id)
      }));
      
      setSearchResults(updatedResults);
      setIsSearching(false);
    }, 1000);
  };

  const handleSelectEmail = (emailId: string) => {
    const updatedResults = searchResults.map(email => 
      email.id === emailId ? { ...email, selected: !email.selected } : email
    );
    setSearchResults(updatedResults);
    
    const newSelectedEmails = updatedResults.filter(email => email.selected);
    onSelectedEmailsChange(newSelectedEmails);
  };

  const handleSelectAll = () => {
    const allSelected = searchResults.every(email => email.selected);
    const updatedResults = searchResults.map(email => ({ ...email, selected: !allSelected }));
    setSearchResults(updatedResults);
    
    const newSelectedEmails = updatedResults.filter(email => email.selected);
    onSelectedEmailsChange(newSelectedEmails);
  };

  const hasEnoughEmails = selectedEmails.length >= minRequiredEmails;
  
  // Define interface for suggestion items
  interface SuggestionItem {
    query: string;
    description: string;
  }
  
  // Generate suggested search queries from extraction fields
  const suggestedQueries = useMemo<SuggestionItem[]>(() => {
    if (!extractionFields?.length) return [];
    
    // Create suggestions from field names and examples
    const suggestions: SuggestionItem[] = [];
    
    // Add field names as suggestions
    extractionFields
      .filter(field => field.name.trim())
      .forEach(field => {
        suggestions.push({
          query: field.name,
          description: `Search for ${field.name}`
        });
        
        // If examples exist, add them as suggestions too
        if (field.examples?.trim()) {
          const exampleList = field.examples.split(',');
          exampleList.slice(0, 2).forEach(example => {
            if (example.trim()) {
              suggestions.push({
                query: example.trim(),
                description: `Example of ${field.name}`
              });
            }
          });
        }
      });
    
    return suggestions;
  }, [extractionFields]);

  return (
    <Box sx={{ border: '1px solid #e0e0e0', borderRadius: 1, p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Email Selection</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box 
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: selectedEmails.length >= minRequiredEmails ? '#e7f3eb' : '#fff3e0',
              color: selectedEmails.length >= minRequiredEmails ? '#2e7d32' : '#e65100',
              px: 2,
              py: 0.5,
              borderRadius: 50,
              mr: 2
            }}
          >
            {selectedEmails.length >= minRequiredEmails ? (
              <CheckCircleIcon fontSize="small" sx={{ mr: 1 }} />
            ) : (
              <ErrorIcon fontSize="small" sx={{ mr: 1 }} />
            )}
            <Typography variant="body2">
              {selectedEmails.length}/{minRequiredEmails} emails required
            </Typography>
          </Box>
          <Button 
            variant="outlined"
            onClick={handleOpen}
            sx={{ minWidth: '120px', py: 0.8 }}
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </Box>
      </Box>
      
      {!hasEnoughEmails && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          You need at least {minRequiredEmails} emails containing the extraction fields for accurate AI analysis.
        </Alert>
      )}
      
      {selectedEmails.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Selected Emails:</Typography>
          <List dense>
            {selectedEmails.slice(0, 3).map(email => (
              <ListItem key={email.id} sx={{ p: 0.5, bgcolor: '#f5f5f5', mb: 0.5, borderRadius: 1 }}>
                <EmailIcon sx={{ mr: 1, fontSize: '0.9rem', color: '#666' }} />
                <ListItemText 
                  primary={email.subject} 
                  secondary={email.from}
                  primaryTypographyProps={{ variant: 'body2' }}
                  secondaryTypographyProps={{ variant: 'caption' }}
                />
              </ListItem>
            ))}
            {selectedEmails.length > 3 && (
              <Typography variant="caption" sx={{ display: 'block', pl: 1 }}>
                +{selectedEmails.length - 3} more emails selected
              </Typography>
            )}
          </List>
        </Box>
      )}
      
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          Search for Emails with Extraction Fields
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Search for emails that contain the data you want to extract. The AI model needs at least {minRequiredEmails} examples to learn from.
            </Typography>
            
            {suggestedQueries.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2">Suggested searches:</Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 0.5 }}>
                  {suggestedQueries.length > 0 ? (
                    suggestedQueries.slice(0, 3).map((suggestion: SuggestionItem, index: number) => (
                      <Chip 
                        key={index}
                        label={suggestion.query} 
                        size="small" 
                        onClick={() => setSearchQuery(suggestion.query)}
                        color="primary"
                        variant="outlined"
                        sx={{ mb: 0.5 }}
                      />
                    ))
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      Add extraction field names to see suggestions
                    </Typography>
                  )}
                </Box>
              </Box>
            )}
            
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                placeholder="Search emails by Extraction Fields ex. order id, invoice number, etc."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                variant="contained" 
                startIcon={isSearching ? <CircularProgress size={16} color="inherit" /> : <SearchIcon />}
                onClick={handleSearch}
                disabled={isSearching || searchQuery.trim().length === 0}
              >
                Search
              </Button>
            </Box>
          </Box>
          
          {searchResults.length > 0 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle2">Search Results:</Typography>
                <Button 
                  size="small" 
                  onClick={handleSelectAll}
                >
                  {searchResults.every(email => email.selected) ? 'Deselect All' : 'Select All'}
                </Button>
              </Box>
              <List sx={{ maxHeight: 400, overflow: 'auto', bgcolor: '#f5f5f5', borderRadius: 1 }}>
                {searchResults.map(email => (
                  <ListItem 
                    key={email.id}
                    dense
                    onClick={() => handleSelectEmail(email.id)}
                    sx={{ 
                      mb: 0.5, 
                      bgcolor: email.selected ? '#e3f2fd' : 'white',
                      borderRadius: 1,
                      cursor: 'pointer'
                    }}
                  >
                    <Checkbox 
                      edge="start"
                      checked={email.selected}
                      tabIndex={-1}
                      disableRipple
                      size="small"
                    />
                    <ListItemText
                      primary={email.subject}
                      secondary={`${email.from} · ${email.date}`}
                      primaryTypographyProps={{ variant: 'body2' }}
                      secondaryTypographyProps={{ variant: 'caption' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
          
          {isSearching && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress size={40} />
            </Box>
          )}
          
          {searchResults.length === 0 && searchQuery && !isSearching && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1">No emails found matching "{searchQuery}"</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Try different search terms or check your inbox
              </Typography>
              {suggestedQueries.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2">Try one of these instead:</Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1, justifyContent: 'center' }}>
                    {suggestedQueries.slice(0, 3).map((suggestion: SuggestionItem, index: number) => (
                      <Chip 
                        key={index}
                        label={suggestion.query} 
                        size="small" 
                        onClick={() => setSearchQuery(suggestion.query)}
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Typography variant="body2" sx={{ mr: 'auto', ml: 2, color: selectedEmails.length >= minRequiredEmails ? 'success.main' : 'warning.main' }}>
            {selectedEmails.length}/{minRequiredEmails} emails selected
          </Typography>
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
            variant="contained"
            onClick={handleClose}
            disabled={selectedEmails.length < minRequiredEmails}
          >
            Confirm Selection
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmailSelectionHelper;
