import React, { useEffect, useState } from "react";
import "./Leaderboard.scss";
import medalIcon from "../../assets/icons/icon_medal.svg";
import peopleGroupIcon from "../../assets/icons/icon_people-group.svg";
import starIcon from "../../assets/icons/icon_star.svg";
import supabase from "../../config/supabaseClient";
// const data = [
//     {
//         id: 1,
//         name: 'Company 1',
//         image: 'https://optimise2.assets-servd.host/dig-upsiide/production/images/starbsloh.png?w=735&h=400&q=100&fm=jpg&fit=crop&dm=1668098882&s=3ee470c8b1123213d7f7f147bc1126e4',
//         employeeCount: 100,
//         score: 200,
//         medals: 3
//     },
//     {
//         id: 2,
//         name: 'Company 2',
//         image: 'https://optimise2.assets-servd.host/dig-upsiide/production/images/starbsloh.png?w=735&h=400&q=100&fm=jpg&fit=crop&dm=1668098882&s=3ee470c8b1123213d7f7f147bc1126e4',
//         employeeCount: 200,
//         score: 100,
//         medals: 2
//     },
//     {
//         id: 3,
//         name: 'Company 3',
//         image: 'https://optimise2.assets-servd.host/dig-upsiide/production/images/starbsloh.png?w=735&h=400&q=100&fm=jpg&fit=crop&dm=1668098882&s=3ee470c8b1123213d7f7f147bc1126e4',
//         employeeCount: 300,
//         score: 300,
//         medals: 1
//     },
//     {
//         id: 4,
//         name: 'Company 4',
//         image: 'https://optimise2.assets-servd.host/dig-upsiide/production/images/starbsloh.png?w=735&h=400&q=100&fm=jpg&fit=crop&dm=1668098882&s=3ee470c8b1123213d7f7f147bc1126e4',
//         employeeCount: 150,
//         score: 250,
//         medals: 4
//     },
//     {
//         id: 5,
//         name: 'Company 5',
//         image: 'https://optimise2.assets-servd.host/dig-upsiide/production/images/starbsloh.png?w=735&h=400&q=100&fm=jpg&fit=crop&dm=1668098882&s=3ee470c8b1123213d7f7f147bc1126e4',
//         employeeCount: 250,
//         score: 150,
//         medals: 1
//     }
// ];

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [fetchError, setFetchError] = useState("");
  //     useEffect(() => {
  //         // Fetch leaderboard data from the server
  //         const fetchLeaderboardData = async () => {
  //             try {
  //                 // const response = await fetch('/api/leaderboard');
  //                 // const data = await response.json();
  //                 setLeaderboardData(data);
  //             } catch (error) {
  //                 console.error('Error fetching leaderboard data:', error);
  //             }
  //         };

  //         fetchLeaderboardData();
  //     }, []);

  useEffect(() => {
    const fetchCompany = async () => {
      const { data, error } = await supabase.from("company").select();
      if (error) {
        setFetchError("Could not Fetch the Company");
      }
      if (data) {
        setLeaderboardData(data);
        console.log(data)
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
          .sort((a, b) => b.score - a.score)
          .map((company, index) => (
            <div
              className="company-bubble"
              key={company.id}
              style={{
                backgroundImage: `url(${company.image})`,
                maxWidth: `${company.score / 20}%`,
                bottom: `${Math.floor(Math.random() * 70) + 20}px`,
                right: `${Math.floor(Math.random() * 70) + 10}px`,
              }}
              onClick={() =>
                (window.location.href = `leaderboard/${company.id}`)
              }
            >
              <div className="company-bubble__name">{company.name}</div>
              <div className="company-bubble__stats-wrapper">
                <div className="stats-item">
                  <img src={`${peopleGroupIcon}`} alt="Employee Count" />
                  {company.employeecount}
                </div>
                <div className="stats-item">
                  <img src={`${starIcon}`} alt="Company Score" />
                  {company.score}
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
