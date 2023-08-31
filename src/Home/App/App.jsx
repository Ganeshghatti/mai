import React, { useState, useEffect } from "react";
import OpenAI from "openai";
import "./App.scss";

export default function App() {
  const [response, setResponse] = useState("");
  const [videos, setVideos] = useState([]);
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    name: "",
    days: "",
    problem: "",
  });
  const [letterAnimationCompleted, setletterAnimationCompleted] =
    useState(true);

  const initialFormData = {
    max: "",
    gender: "",
    name: "",
    days: "",
    problem: "",
  };

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    const requiredFields = ["age", "gender", "name", "days", "problem"];
    const emptyFields = requiredFields.filter((field) => !formData[field]);
    if (emptyFields.length > 0) {
      alert(`Please fill out the following fields: ${emptyFields.join(", ")}`);
      return;
    }
    console.log(formData);
    document.getElementsByClassName("app-code-issue")[0].style.display =
      "block";
    try {
      const openaiInstance = new OpenAI({
        apiKey: "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",
        dangerouslyAllowBrowser: true,
      });
      const completion = await openaiInstance.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `
              Patient ${formData.name}, a ${formData.age}-year-old ${formData.gender}, is currently experiencing ${formData.problem} from ${formData.days} days.  Diagnose the patient and generate the following outputs : 1) Precautions he should be taking 2) Possible disease  3)Provide medical advice considering the details of the patient, in the advice always include necessary 4) precautions that should be taken by the patient and lifestyle changes if needed `,
          },
        ],
        model: "gpt-3.5-turbo",
      });

      const responseText = completion.choices[0].message.content;
      setResponse(responseText);
    } catch (error) {
      console.error("Error with OpenAI:", error);
    }

    const ytapiKey = "AIzaSyDLtCW2mkBZNFUVg10aqe8WkjmWq6I8JIY";
    const searchTerm = "Fighting the Persistent Fever";
    const maxResults = 3;

    fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${ytapiKey}&q=${searchTerm}&maxResults=${maxResults}&part=snippet&type=video`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        document.getElementsByClassName("app-yt-videos-h2")[0].style.display =
          "block";
        setVideos(data.items);
      })
      .catch((error) => {
        console.error("Error fetching YouTube videos:", error);
      });
    // setFormData(initialFormData);
  };
  // function LetterByLetterText({ text }) {
  //   const [displayText, setDisplayText] = useState("");
  //   const [currentIndex, setCurrentIndex] = useState(0);

  //   useEffect(() => {
  //     if (letterAnimationCompleted) {
  //       if (currentIndex < text.length) {
  //         const timeoutId = setTimeout(() => {
  //           setDisplayText((prevText) => prevText + text[currentIndex]);
  //           setCurrentIndex((prevIndex) => prevIndex + 1);
  //         }, 80);

  //         return () => clearTimeout(timeoutId);
  //       }
  //     }
  //   }, [currentIndex, text]);
  //   setletterAnimationCompleted(false);
  //   return <span>{displayText}</span>;
  // }
  const [displayText, setDisplayText] = useState("");
  const text = "  Hello!How can I assist you today?   ";

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText((prevText) => prevText + text[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 80);

    return () => clearInterval(intervalId);
  }, []);

  const codeStyles = {
    backgroundColor: "lightgray",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    padding: "20px",
    margin: "20px 0",
    borderRadius: "5px",
    overflowX: "auto",
    width: "40vw",
    border: "2px solid red",
    cursor: "text",
    height: "400px",
  };
  
  const codeStylesMobile = {
    ...codeStyles,
    width: "80vw",
  };

  return (
    <section id="app">
      <h1 className="app-title">
        Please explain your
        <br /> issues in details
      </h1>
      <div className="app-form-code-div">
        <form>
          <label>
            Name:
            <br />
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="enter your name"
              required
            />
          </label>
          <br />
          <label>
            Age (6-100):
            <br />
            <input
              type="number"
              value={formData.age}
              min={6}
              max={100}
              onChange={(e) => handleChange("age", e.target.value)}
              required
              placeholder="enter your age"
            />
          </label>
          <br />

          <div className="app-gender-label">
            <label>Gender:</label>
            <div>
              <input
                type="radio"
                value="male"
                checked={formData.gender === "male"}
                onChange={() => handleChange("gender", "male")}
                required
                id="app-form-gender-male"
              />
              <label htmlFor="app-form-gender-male">Male</label>
              <input
                type="radio"
                value="female"
                checked={formData.gender === "female"}
                onChange={() => handleChange("gender", "female")}
                required
                id="app-form-gender-female"
              />
              <label htmlFor="app-form-gender-female">Female</label>
            </div>
          </div>

          <br />

          <label>
            From How Many Days?
            <br />
            <input
              type="number"
              value={formData.days}
              onChange={(e) => handleChange("days", e.target.value)}
              required
              placeholder="from how many days are you suffering?"
            />
          </label>
          <br />

          <label>
            Your Problem in Detail:
            <br />
            <textarea
              value={formData.problem}
              onChange={(e) => handleChange("problem", e.target.value)}
              required
              placeholder="please explain your issue in detail so that we can comeup with the most appropriate results"
            />
          </label>
          <br />

          <button
            type="button"
            onClick={handleSubmit}
            className="app-submitbutton"
          >
            Submit
          </button>
        </form>
       <code style={window.innerWidth <= 950 ? codeStylesMobile : codeStyles}>
          {/* <LetterByLetterText text="Hello! How can I assist you today?" /> */}
          <span>{displayText}</span>
          <span className="app-code-issue">
            Patient {formData.name}, a {formData.age}-year-old
            {formData.gender}, is currently experiencing {formData.problem}
            from {formData.days} days. Diagnose the patient
          </span>
          <span>{response}</span>
        </code>
      </div>
      <div className="app-yt-videos">
        <h2 className="app-yt-videos-h2">
          We Also recommend to
          <br /> watch these videos!
        </h2>
        <div className="video-list">
          {videos.map((video) => (
            <div key={video.id.videoId} className="video-item">
              <iframe
                title={video.snippet.title}
                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                frameBorder="0"
                allowFullScreen
              ></iframe>
              <p className="app-video-snippet-title">{video.snippet.title}</p>
              <p className="app-video-snippet-channeltitle">
                {video.snippet.channelTitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
