import React, { useState } from 'react';
import '../CSS/Content.css';
import AddTopicPopup from './Addtopic'; // Import the new component

const SubjectContent = () => {
  const [topics, setTopics] = useState([
    {
      name: "Topic 1",
      subtopics: [
        { name: "Subtopic 1.1", notes: null, worksheet: null },
        { name: "Subtopic 1.2", notes: null, worksheet: null },
        { name: "Subtopic 1.3", notes: null, worksheet: null },
      ],
      isOpen: false,
    },
    {
      name: "Topic 2",
      subtopics: [
        { name: "Subtopic 2.1", notes: null, worksheet: null },
        { name: "Subtopic 2.2", notes: null, worksheet: null },
        { name: "Subtopic 2.3", notes: null, worksheet: null },
      ],
      isOpen: false,
    },
    {
      name: "Topic 3",
      subtopics: [
        { name: "Subtopic 3.1", notes: null, worksheet: null },
        { name: "Subtopic 3.2", notes: null, worksheet: null },
        { name: "Subtopic 3.3", notes: null, worksheet: null },
      ],
      isOpen: false,
    },
    {
      name: "Topic 4",
      subtopics: [
        { name: "Subtopic 4.1", notes: null, worksheet: null },
        { name: "Subtopic 4.2", notes: null, worksheet: null },
        { name: "Subtopic 4.3", notes: null, worksheet: null },
      ],
      isOpen: false,
    },
  ]);

  const [showTopicPopup, setShowTopicPopup] = useState(false);
  const [newTopic, setNewTopic] = useState({ name: "", subtopic: "", notes: null, worksheet: null });

  const [showSubtopicPopup, setShowSubtopicPopup] = useState(false);
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(null);
  const [newSubtopic, setNewSubtopic] = useState({ name: "", notes: null, worksheet: null });

  // Function to toggle the dropdown for a topic
  const toggleTopic = (index) => {
    setTopics(
      topics.map((topic, i) =>
        i === index ? { ...topic, isOpen: !topic.isOpen } : topic
      )
    );
  };

  // Function to add a new topic
  const addNewTopic = (e) => {
    e.preventDefault();
    const newTopicData = {
      name: newTopic.name,
      subtopics: [{ name: newTopic.subtopic, notes: newTopic.notes, worksheet: newTopic.worksheet }],
      isOpen: false,
    };
    setTopics([...topics, newTopicData]);
    setShowTopicPopup(false); // Close the popup after adding
  };

  // Function to add a new subtopic to a topic (untouched as requested)
  const addNewSubtopic = (e) => {
    e.preventDefault();
    const updatedTopics = [...topics];
    updatedTopics[selectedTopicIndex].subtopics.push({ name: newSubtopic.name, notes: newSubtopic.notes, worksheet: newSubtopic.worksheet });
    setTopics(updatedTopics);
    setShowSubtopicPopup(false); // Close the popup after adding
  };

  return (
    <div className="subject-content-container">
      {/* Add Topic Button */}
      <button className="add-topic-btn" onClick={() => setShowTopicPopup(true)}>+ Add Topic</button>

      {/* Add Topic Popup */}
      {showTopicPopup && (
        <AddTopicPopup newTopic={newTopic} setNewTopic={setNewTopic} addNewTopic={addNewTopic}  setShowTopicPopup={setShowTopicPopup}/>
      )}

      {/* Topic List */}
      <div className="topics-list">
        {topics.map((topic, index) => (
          <div key={index} className="topic-item">
            <div className="topic-header">
              <span className="topic-name" onClick={() => toggleTopic(index)}>
                {topic.name}
              </span>
              <button
                className="add-subtopic-btn"
                onClick={() => {
                  setSelectedTopicIndex(index);
                  setShowSubtopicPopup(true);
                }}
              >
                + Add Subtopic
              </button>
            </div>
            {topic.isOpen && (
              <div className="subtopics-list">
                {topic.subtopics.map((subtopic, subIndex) => (
                  <div key={subIndex} className="subtopic-item">
                    {subtopic.name} -&nbsp;
                    <a href={subtopic.notes} target="_blank" rel="noopener noreferrer">
                      Notes
                    </a>
                    &nbsp;|&nbsp;
                    <a href={subtopic.worksheet} target="_blank" rel="noopener noreferrer">
                      Worksheet
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Subtopic Popup (left untouched as requested) */}
      {showSubtopicPopup && (
        <div className="popup-form">
          <form onSubmit={addNewSubtopic}>
            <label>
              Subtopic Name:
              <input
                type="text"
                value={newSubtopic.name}
                onChange={(e) => setNewSubtopic({ ...newSubtopic, name: e.target.value })}
                required
              />
            </label>
            <label>
              Upload Notes:
              <input type="file" onChange={(e) => setNewSubtopic({ ...newSubtopic, notes: e.target.files[0] })} />
            </label>
            <label>
              Upload Worksheet:
              <input type="file" onChange={(e) => setNewSubtopic({ ...newSubtopic, worksheet: e.target.files[0] })} />
            </label>
            <button type="submit">Add Subtopic</button>
            <button type="button" onClick={() => setShowSubtopicPopup(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SubjectContent;
