using MongoDB.Bson;

public class InterviewQuestionAnswerDto
{
    public string Question { get; set; } = string.Empty;
    public string Answer { get; set; } = string.Empty;
    public int FrequencyCount { get; set; } = 0;
    public ObjectId? JobApplicationId { get; set; }
}
