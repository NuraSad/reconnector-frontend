import { useEffect, useState } from "react";
import "./Leaderboard.scss";
import medalIcon from "../../assets/icons/icon_medal.svg";
import peopleGroupIcon from "../../assets/icons/icon_people-group.svg";
import starIcon from "../../assets/icons/icon_star.svg";
import supabase from "../../config/supabaseClient";
import { useNavigate } from "react-router-dom";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [fetchError, setFetchError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompany = async () => {
      const { data, error } = await supabase.from("company").select();
      if (error) {
        setFetchError("Could not Fetch the Company");
      }
      if (data) {
        console.log(data);
        setLeaderboardData(data);
        console.log(data);
        setFetchError(null);
      }
    };
    fetchCompany();
  }, []);

  return (
    <section className="leaderboard">
      <h1 className="leaderboard__title page-font">Leaderboard</h1>
      <div className="leaderboard__bubble-container">
        {leaderboardData
          .sort((a, b) => b.points - a.points)
          .map((company, index) => (
            <div
              className="company-bubble"
              key={company.id}
              style={{
                backgroundImage: `url(${company.logo})`,
                maxWidth: `${company.points / 20}%`,
                bottom: `${Math.floor(Math.random() * 70) + 20}px`,
                right: `${Math.floor(Math.random() * 70) + 10}px`,
              }}
              onClick={() => navigate(`/leaderboards/${company.id}`)}
            >
              <div className="company-bubble__name">{company.name}</div>
              <div className="company-bubble__stats-wrapper">
                <div className="stats-item">
                  <img src={`${peopleGroupIcon}`} alt="Employee Count" />
                  {company.employeecount}
                </div>
                <div className="stats-item">
                  <img src={`${starIcon}`} alt="Company Score" />
                  {company.points}
                </div>
                <div className="stats-item">
                  <img src={`${medalIcon}`} alt="Medals won" />
                  {company.medals}
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Leaderboard;
