import useSurvey from "../../../Hooks/useSurvey";

const RecentPublish = () => {
  const [surveys, surveyPending, fetch] = useSurvey();
  const filterSurvey = surveys.filter((survey) => survey.status === "Approved");
  const mostRecentlyPublishedSurvey =
    filterSurvey.length > 0
      ? [...surveys].sort((a, b) => b.date - a.date)[0]
      : null;

  console.log(mostRecentlyPublishedSurvey);
  return <div>
    
  </div>;
};

export default RecentPublish;
