import { useState, useEffect } from 'react';
import { getTopics, getConfig } from './services/api';
import Sidebar from './components/Sidebar';
import ChatPanel from './components/ChatPanel';
import ProviderBadge from './components/ProviderBadge';

function App() {
  const [topics, setTopics] = useState([]);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [provider, setProvider] = useState('loading...');

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const topicsData = await getTopics();
        setTopics(topicsData);

        const configData = await getConfig();
        if (configData && configData.llm_provider) {
          setProvider(configData.llm_provider);
        }
      } catch (error) {
        console.error('Failed to load initial application data:', error);
      }
    };

    loadInitialData();
  }, []);

  const handlePromptClick = (promptText) => {
    setInputValue(promptText);
  };

  const handleInputChange = (newValue) => {
    setInputValue(newValue);
  };

  const handleMessagesUpdate = (updatedHistory) => {
    setMessages(updatedHistory);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Junior Dev Prep Assistant</h1>
        <ProviderBadge provider={provider} />
      </header>

      <div className="app-body">
        <Sidebar topics={topics} onPromptClick={handlePromptClick} />
        <ChatPanel
          messages={messages}
          inputValue={inputValue}
          onInputChange={handleInputChange}
          onMessagesUpdate={handleMessagesUpdate}
        />
      </div>
    </div>
  );
}

export default App;