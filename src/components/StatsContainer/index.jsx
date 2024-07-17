import { useContext, useCallback } from "react";
import styles from "./StatsContainer.module.css";
import { AppContext } from "../../contexts/AppProvider";

const StatsContainer = () => {
  const { collapseSidebar, playersInfo } = useContext(AppContext);

  const getWinningPlayer = useCallback(() => {
    let winningPlayerIndex = 0;
    let maxTilesMoved = playersInfo[0].tilesMoved;

    playersInfo.forEach((player, i) => {
      if (player.tilesMoved > maxTilesMoved) {
        winningPlayerIndex = i;
        maxTilesMoved = player.tilesMoved;
      }
    });

    if (maxTilesMoved === 0) return -1;
    else return winningPlayerIndex;
  }, [playersInfo]);

  return (
    <div
      className={`${styles.statsContainer} ${
        collapseSidebar && styles.adjustPadding
      }`}
    >
      <h1 className={`text-player-turn ${styles.primaryHeading}`}>Stats</h1>
      <table cellSpacing={0}>
        <thead className={styles.tHeadTop}>
          <tr>
            <th title="Player's Counter">C</th>
            <th className={styles.colName} title="Player's Name">
              N
            </th>
            <th title="Total Snake Bites">S</th>
            <th title="Total Ladder Climbs">L</th>
            <th title="The Winning Player">W</th>
          </tr>
        </thead>
        <tbody>
          <tr className="stats__player-0">
            <th>
              <img src="img/counters/red.webp" alt="Red-Counter" />
            </th>
            <th className={styles.colName}>Red Player</th>
            <td className="snakes-bites">{playersInfo[0].snakeBites}</td>
            <td className="ladder-climbs">{playersInfo[0].ladderClimbs}</td>
            <td className={styles.trophyIcon}>
              <img
                src="img/trophy_icon.svg"
                alt=""
                style={{
                  visibility: getWinningPlayer() == 0 ? "visible" : "hidden",
                }}
              />
            </td>
          </tr>
          <tr className="stats__player-1">
            <th>
              <img src="img/counters/yellow.webp" alt="Yellow-Counter" />
            </th>
            <th className={styles.colName}>Yellow Player</th>
            <td className="snakes-bites">{playersInfo[1].snakeBites}</td>
            <td className="ladder-climbs">{playersInfo[1].ladderClimbs}</td>
            <td className={styles.trophyIcon}>
              <img
                src="img/trophy_icon.svg"
                alt=""
                style={{
                  visibility: getWinningPlayer() == 1 ? "visible" : "hidden",
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
      {/* <div className={styles.tabelHeadAbbreviations}>
        <p>
          C - Player's Counter, N - Player's Name, S - Total Snake Bites, L -
          Total Ladder Climbs, W - Winning Player
        </p>
      </div> */}
    </div>
  );
};

export default StatsContainer;
