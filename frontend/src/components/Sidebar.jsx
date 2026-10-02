function Sidebar({ topics, onPromptClick }) {
  const categories = Array.isArray(topics) ? topics : [topics];

  return (
    <aside className="sidebar">
      {categories.map((cat) => (
        <div key={cat.category} className="sidebar-category-group">
          {cat.category && <h2 className="category-title">{cat.category}</h2>}
          
          {cat.topics && cat.topics.map((topic) => (
            <div key={topic.topic_name} className="topic-section">
              <h3 className="topic-name">{topic.topic_name}</h3>
              
              <div className="prompt-buttons-list">
                {topic.prompts && topic.prompts.map((item) => (
                  <button
                    key={item.label}
                    className="prompt-button"
                    onClick={() => onPromptClick(item.prompt)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </aside>
  );
}

export default Sidebar;