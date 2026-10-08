import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { sendMessage } from '../services/api';

function ChatPanel({ messages, inputValue, onInputChange, onMessagesUpdate }) {
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessageContent = inputValue.trim();
    onInputChange('');

    const newUserMessage = { 
      id: crypto.randomUUID(), 
      role: 'user', 
      content: userMessageContent 
    };
    
    const updatedHistoryWithUser = [...messages, newUserMessage];
    onMessagesUpdate(updatedHistoryWithUser);
    setIsLoading(true);

    try {
      const sanitizedHistory = messages.map(({ role, content }) => ({ role, content }));
      const apiResponse = await sendMessage(userMessageContent, sanitizedHistory);
      
      const assistantMessage = { 
        id: crypto.randomUUID(), 
        role: 'assistant', 
        content: apiResponse.response 
      };

      const finalHistory = [...updatedHistoryWithUser, assistantMessage];
      onMessagesUpdate(finalHistory);
    } catch (error) {
      console.error('Failed to send message to backend:', error);
      const errorMessage = { 
        id: crypto.randomUUID(), 
        role: 'assistant', 
        content: 'Error: Failed to fetch response from the server. Please check your backend connection.' 
      };
      onMessagesUpdate([...updatedHistoryWithUser, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-panel">
      <div className="message-list">
        {messages.length === 0 ? (
          <div className="empty-chat-state">
            <p>Welcome to your Junior Dev Prep Assistant! Select a topic from the sidebar or type a question below to begin.</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`message-bubble ${msg.role}`}>
              <span className="message-role">{msg.role === 'user' ? 'You' : 'Assistant'}</span>
              <div className="message-content">
                {msg.role === 'assistant' ? (
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                ) : (
                  msg.content
                )}
              </div>
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="message-bubble assistant loading-bubble">
            <span className="message-role">Assistant</span>
            <div className="message-content">Thinking...</div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input-form" onSubmit={handleSubmit}>
        <textarea
          className="chat-textarea"
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Type your question or select a prompt..."
          rows={2}
          disabled={isLoading}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <button type="submit" className="send-button" disabled={isLoading || !inputValue.trim()}>
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}

export default ChatPanel;