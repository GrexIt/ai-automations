import React, { useState } from 'react';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import IfBlock from './blocks/IfBlock';
import ThenBlock from './blocks/ThenBlock';
import { Email } from './AIAgentBlock';

// Type definitions
type BlockType = 'if' | 'then';

interface ExtractionField {
  name: string;
  description: string;
  examples: string;
}

interface Block {
  id: string;
  type: BlockType;
  // If block properties
  conditionType?: string;
  conditions?: Array<{id: string, type: string, value: string}>;
  aiAgentType?: string;
  // Then block properties
  actionType?: string;
  standardAction?: string;
  showAiActionSelector?: boolean;
  selectedAiAction?: string;
  selectedAgentType?: string;
  extractionFields?: ExtractionField[];
  sentimentThreshold?: number;
  selectedEmails?: Email[];
  extractionSources?: {
    subject: boolean;
    body: boolean;
    attachments: boolean;
  };
}

interface FlowContainerProps {
  initialBlocks?: Block[];
  onBlocksChange?: (blocks: Block[]) => void;
}

const FlowContainer: React.FC<FlowContainerProps> = ({ initialBlocks = [], onBlocksChange }) => {
  // Default initial blocks are an "if" block immediately followed by a "then" block
  const [blocks, setBlocksState] = useState<Block[]>(
    initialBlocks.length > 0 
      ? initialBlocks 
      : [
          {
            id: `block-${Date.now()}`,
            type: 'if',
            conditionType: 'traditional',
            conditions: [],
            aiAgentType: ''
          },
          {
            id: `block-${Date.now() + 1}`,
            type: 'then',
            actionType: 'standard',
            standardAction: '',
            showAiActionSelector: false,
            selectedAiAction: '',
            selectedAgentType: '',
            extractionFields: [{
              name: '',
              description: '',
              examples: ''
            }],
            extractionSources: {
              subject: true,
              body: true,
              attachments: false
            }
          }
        ]
  );

  // Custom setter that also notifies parent component of changes
  const setBlocks = (newBlocks: Block[] | ((prevBlocks: Block[]) => Block[])) => {
    const updatedBlocks = typeof newBlocks === 'function' ? newBlocks(blocks) : newBlocks;
    setBlocksState(updatedBlocks);
    if (onBlocksChange) {
      onBlocksChange(updatedBlocks);
    }
  };

  // State for the add block menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentBlockIndex, setCurrentBlockIndex] = useState<number>(-1);
  const open = Boolean(anchorEl);

  // Create a new block with default values based on type
  const createBlock = (type: BlockType): Block => {
    if (type === 'if') {
      return {
        id: `if-${Date.now()}`,
        type: 'if',
        conditionType: 'traditional',
        conditions: [],
        aiAgentType: ''
      };
    } else {
      return {
        id: `then-${Date.now()}`,
        type: 'then',
        actionType: 'standard',
        standardAction: '',
        extractionFields: [{
          name: '',
          description: '',
          examples: ''
        }],
        selectedEmails: [],
        extractionSources: {
          subject: true,
          body: true,
          attachments: false
        }
      };
    }
  };

  // Open the add block menu
  const handleOpenBlockMenu = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
    setAnchorEl(event.currentTarget);
    setCurrentBlockIndex(index);
  };

  // Handle menu close
  const handleCloseBlockMenu = () => {
    setAnchorEl(null);
    setCurrentBlockIndex(-1);
  };

  // Add a new block after the current block
  const handleAddBlock = (type: BlockType) => {
    const newBlock = createBlock(type);
    const newBlocks = [...blocks];
    newBlocks.splice(currentBlockIndex + 1, 0, newBlock);
    setBlocks(newBlocks);
    handleCloseBlockMenu();
  };

  // Delete a block by ID
  const handleDeleteBlock = (blockId: string) => {
    const newBlocks = blocks.filter(block => block.id !== blockId);
    // Don't allow deleting all blocks - keep at least one
    if (newBlocks.length === 0) {
      return;
    }
    setBlocks(newBlocks);
  };

  // Update a block's properties
  const updateBlock = (blockId: string, updatedProps: Partial<Block>) => {
    const blockIndex = blocks.findIndex(block => block.id === blockId);
    if (blockIndex === -1) return;

    const updatedBlocks = [...blocks];
    updatedBlocks[blockIndex] = { ...updatedBlocks[blockIndex], ...updatedProps };
    setBlocks(updatedBlocks);
  };

  // Generate handlers for If blocks
  const getIfBlockHandlers = (blockId: string) => {
    return {
      handleConditionTypeChange: (event: React.MouseEvent<HTMLElement>, newType: string | null) => {
        if (newType) {
          updateBlock(blockId, { conditionType: newType });
        }
      },
      handleAiAgentTypeChange: (newType: string) => {
        updateBlock(blockId, { aiAgentType: newType });
      },
      setConditions: (conditions: Array<{id: string, type: string, value: string}>) => {
        updateBlock(blockId, { conditions });
      }
    };
  };

  // Generate handlers for Then blocks
  const getThenBlockHandlers = (blockId: string) => {
    return {
      handleActionTypeChange: (event: React.MouseEvent<HTMLElement>, newType: string | null) => {
        if (newType) {
          updateBlock(blockId, { actionType: newType });
        }
      },
      setStandardAction: (action: string) => {
        updateBlock(blockId, { standardAction: action });
      },
      setShowAiActionSelector: (show: boolean) => {
        updateBlock(blockId, { showAiActionSelector: show });
      },
      handleAiActionSelect: (actionId: string) => {
        updateBlock(blockId, { selectedAiAction: actionId });
      },
      renderSelectedAiAction: () => null,
      onAgentTypeChange: (agentType: string) => {
        updateBlock(blockId, { selectedAgentType: agentType });
      },
      onExtractionSourcesChange: (sources: {subject: boolean, body: boolean, attachments: boolean}) => {
        updateBlock(blockId, { extractionSources: sources });
      },
      onExtractionFieldsChange: (fields: ExtractionField[]) => {
        updateBlock(blockId, { extractionFields: fields });
      },
      onSelectedEmailsChange: (emails: Email[]) => {
        updateBlock(blockId, { selectedEmails: emails });
      }
    };
  };

  // Function to check if a block is the first If block in the sequence
  const isFirstIfBlock = (index: number, blockType: BlockType): boolean => {
    return index === 0 && blockType === 'if';
  };

  return (
    <Box>
      {/* Render all blocks */}
      {blocks.map((block, index) => (
        <Box key={block.id} sx={{ position: 'relative' }}>
          {/* Render the appropriate block type */}
          {block.type === 'if' ? (
            <IfBlock
              blockId={block.id}
              conditionType={block.conditionType || 'traditional'}
              conditions={block.conditions || []}
              aiAgentType={block.aiAgentType || ''}
              onDeleteBlock={handleDeleteBlock}
              availableExtractionFields={blocks
                .filter(b => b.type === 'then' && Array.isArray(b.extractionFields) && b.extractionFields.length > 0)
                .flatMap(b => b.extractionFields || [])}
              sentimentAnalysisEnabled={blocks
                .some(b => b.type === 'then' && b.selectedAgentType === 'sentiment')}
              {...getIfBlockHandlers(block.id)}
            />
          ) : (
            <ThenBlock
              blockId={block.id}
              actionType={block.actionType || 'standard'}
              standardAction={block.standardAction || ''}
              showAiActionSelector={block.showAiActionSelector || false}
              selectedAiAction={block.selectedAiAction || ''}
              selectedAgentType={block.selectedAgentType || ''}
              extractionSources={block.extractionSources}
              extractionFields={block.extractionFields}
              selectedEmails={block.selectedEmails}
              onDeleteBlock={handleDeleteBlock}
              {...getThenBlockHandlers(block.id)}
            />
          )}

          {/* "Add Block" button after each block, EXCEPT after the first If block */}
          {!isFirstIfBlock(index, block.type) && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 0.5 }}>
              <Button
                size="small"
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={(e) => handleOpenBlockMenu(e, index)}
                sx={{
                  borderRadius: '18px',
                  textTransform: 'none',
                  py: 0,
                  px: 1,
                  minWidth: '90px',
                  borderColor: '#dfdfdf',
                  color: '#666',
                  fontSize: '0.8rem'
                }}
              >
                Add Step
              </Button>
            </Box>
          )}
        </Box>
      ))}

      {/* Add block menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseBlockMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem onClick={() => handleAddBlock('if')} sx={{ minWidth: '120px' }}>If (Condition)</MenuItem>
        <MenuItem onClick={() => handleAddBlock('then')} sx={{ minWidth: '120px' }}>Then (Action)</MenuItem>
      </Menu>
    </Box>
  );
};

export default FlowContainer;
