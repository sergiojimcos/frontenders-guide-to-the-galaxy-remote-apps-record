import  ReactDOM  from 'react-dom';
import { useState, useEffect } from 'react';
import ClayTable from '@clayui/table';
import './App.css';

const spritemap = "https://cdn.jsdelivr.net/npm/@clayui/css/lib/images/icons/icons.svg";
const {Liferay, themeDisplay} = window;

const CUSTOM_EVENT_RECORD_APP = 'customEventRecordApp';

const defaultPlayers = [{
  name: 'Alberto Ruiz',
  score: 25
},
{
  name: 'Irene Díaz',
  score: 20
}];


function App() {

  const [players, setPlayers] = useState(defaultPlayers);

  function existPlayer (playerName) {
    const listPlayers = [...players];
    for(const player of listPlayers){
      if (player.name === playerName){
        return true;
      }
    }
    return false;
  }

  useEffect(() =>{
    
    Liferay.on(CUSTOM_EVENT_RECORD_APP, (event) => {
      const listPlayers = [...players];
	    const playerName = event.namePlayer;
      const score = event.score;
      
      if (existPlayer(playerName)){
        for(var i = 0; i < listPlayers.length; i++){
          if (listPlayers[i].name === playerName){
            listPlayers[i].score+=score;
          }
        }
        setPlayers(listPlayers);
      }else {
        listPlayers.push({name:playerName, score: score});
        setPlayers(listPlayers);
      }
      
    })

  },[])


  return (
    <div className="App">
      <ClayTable hover striped responsiveSize='md'>
			<ClayTable.Head>
				<ClayTable.Row>
					<ClayTable.Cell headingTitle align='left'>
						User Name
					</ClayTable.Cell>
					<ClayTable.Cell  headingTitle align='left'>
						Score
					</ClayTable.Cell>
				</ClayTable.Row>
			</ClayTable.Head>
			<ClayTable.Body>
        { 
          players.map((player, key) => (
            <ClayTable.Row>
					    <ClayTable.Cell headingTitle align='left'>{player.name}</ClayTable.Cell>
					    <ClayTable.Cell align='left'>{player.score}</ClayTable.Cell>
				    </ClayTable.Row>
          ))
        }
        

			</ClayTable.Body>
		</ClayTable>
      
    </div>
  );

}
class RecordLicense extends HTMLElement {
	connectedCallback() {
		this.innerHTML = '<div id="recordLicense"></div>';

    ReactDOM.render(
			<App />,
			document.querySelector('#recordLicense')
		);
	}
}

if (customElements.get('record-license')) {
	console.log(
		'Skipping registration for <record-license> (already registered)'
	);
} else {
	customElements.define('record-license', RecordLicense);
}

export default App;
