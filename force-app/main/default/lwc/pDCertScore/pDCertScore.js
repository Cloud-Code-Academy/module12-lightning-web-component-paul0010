import { LightningElement } from 'lwc';

const devFundWeight = 0.23;
const proAutoLogicWeight = 0.30;
const UserIntWeight = 0.25;
const TestDebugAndDeplWeight = 0.22;
const passingScore = 68;

export default class PDCertScore extends LightningElement {

  devFundScore = 50;
  proAutoLogicScore = 50;
  UserIntScore = 50;
  TestDebugAndDeplScore = 50;

  certificationScore = 90;
  numberOfQuestions = 60;

  showResources = false;
  showGoodJob = false;

  currentHistoryId = 0;

  attemptHistory = [
    {Id: 1, Score: 50},
    {Id: 2, Score: 68},
    {Id: 3, Score: 70},
    {Id: 4, Score: 90},
  ];

  calculateScore () {
    let devFundWeightScore = this.devFundScore * devFundWeight;
    let proAutoLogicWeightScore = this.proAutoLogicScore * proAutoLogicWeight;
    let UserIntWeightScore = this.UserIntScore * UserIntWeight;
    let TestDebugAndDeplWeightScore = this.TestDebugAndDeplScore * TestDebugAndDeplWeight;

    this.certificationScore = devFundWeightScore + proAutoLogicWeightScore + UserIntWeightScore + TestDebugAndDeplWeightScore;

    this.showResourcesIfFailed();
    this.addAttemptHistory(this.certificationScore);
  }

  handleChange(event) {
    const inputName = event.target.name;
    let value = Number(event.target.value);
    if (inputName == "devFund") {
      this.devFundScore = value;
    } else if (inputName == "proAutoLogic") {
      this.proAutoLogicScore = value;
    } else if (inputName == "UserInt") {
      this.UserIntScore = value;
    } else if (inputName == "TestDebugAndDepl") {
      this.TestDebugAndDeplScore = value;
    }
  }

  showResourcesIfFailed() {
    if (this.certificationScore < passingScore) {
      this.showResources = true;
    } else {
      this.showResources = false;
    }
    this.showGoodJob = !this.showResources;
  }

  addAttemptHistory(Score) {
    this.currentHistoryId++;
    const attempt =
    {
      Id: this.currentHistoryId, Score
    }
    this.attemptHistory = [...this.attemptHistory, attempt];
  }

  deleteAttemptHandler(event) {
    let attemptId = event.detail;
    this.attemptHistory = this.attemptHistory.filter(attempt => attempt.Id != attemptId);
  }

  connectedCallback() {
    this.currentHistoryId =this.attemptHistory.length;
  }
}