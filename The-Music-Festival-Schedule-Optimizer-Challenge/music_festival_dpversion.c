#include <stdio.h>
#include <stdlib.h>

#define MAX_S 100
#define MAX_P 100
#define MAX_K 100
#define MAX_C 100
#define INF -1000000000

// STRUCT DEFINITIONS

typedef struct {
    int id;
    int stage;
    int start;
    int end;
    int base;
    int growth;
} Performance;

// GLOBAL VARIABLES

int S, P, K;
int distance[MAX_S][MAX_S];
Performance performances[MAX_P];
int dp[MAX_P][MAX_K + 1];
int combo_bonus[MAX_P][MAX_P];

// For reconstructing schedule:
int parent_perf[MAX_P][MAX_K + 1];      // Stores previous performance id in dp path
int parent_k[MAX_P][MAX_K + 1];         // Stores previous k in dp path
int arrival_time[MAX_P][MAX_K + 1];     // Arrival time at current performance

// FUNCTION: initialize DP table

void initialize_dp() {
    for (int i = 0; i < P; i++) {
        for (int k = 0; k <= K; k++) {
            dp[i][k] = INF;
            parent_perf[i][k] = -1;
            parent_k[i][k] = -1;
            arrival_time[i][k] = -1;
        }
    }
}

// FUNCTION: calculate satisfaction

int calculate_satisfaction(Performance p, int arrive, int duration) {
    int time_since_start = arrive - p.start;
    int start_hype = p.base + p.growth * time_since_start;
    return duration * start_hype + p.growth * duration * (duration - 1) / 2;
}

// MAIN PROGRAM

int main() {
    // STEP 1: INPUT BASIC PARAMETERS 
    printf("Enter number of stages (S), performances (P), and max stage changes (K): ");
    scanf("%d %d %d", &S, &P, &K);

    // STEP 2: INPUT DISTANCE MATRIX 
    printf("Enter %dx%d distance matrix:\n", S, S);
    for (int i = 0; i < S; i++) {
        for (int j = 0; j < S; j++) {
            scanf("%d", &distance[i][j]);
        }
    }

    // STEP 3: INPUT PERFORMANCES
    printf("Enter %d performances (stage start end base growth):\n", P);
    for (int i = 0; i < P; i++) {
        scanf("%d %d %d %d %d", &performances[i].stage, &performances[i].start,
              &performances[i].end, &performances[i].base, &performances[i].growth);
        performances[i].id = i;
    }

    //STEP 4: INPUT COMBO DATA
    int C;
    printf("Enter number of combos: ");
    scanf("%d", &C);
    printf("Enter %d combos (performance1_id performance2_id bonus):\n", C);
    for (int i = 0; i < C; i++) {
        int a, b, bonus;
        scanf("%d %d %d", &a, &b, &bonus);
        combo_bonus[a][b] = bonus;
    }

    //STEP 5: Initialize DP
    initialize_dp();

    //STEP 6: Base Case for DP
    for (int i = 0; i < P; i++) {
        int duration = performances[i].end - performances[i].start;
        dp[i][0] = calculate_satisfaction(performances[i], performances[i].start, duration);
        arrival_time[i][0] = performances[i].start;
        parent_perf[i][0] = -1;  // No parent for base case
        parent_k[i][0] = -1;
    }

    //STEP 7: DP Transitions
    for (int i = 0; i < P; i++) {
        for (int k = 0; k <= K; k++) {
            if (dp[i][k] == INF) continue;

            for (int j = 0; j < P; j++) {
                if (i == j) continue;

                int walk = distance[performances[i].stage][performances[j].stage];
                int arrive = performances[i].end + walk;
                if (arrive > performances[j].end) continue;

                int stage_change = (performances[i].stage != performances[j].stage);
                if (k + stage_change > K) continue;

                int start_watch = (arrive > performances[j].start) ? arrive : performances[j].start;
                int watch_time = performances[j].end - start_watch;
                if (watch_time <= 0) continue;

                int added = calculate_satisfaction(performances[j], arrive, watch_time);
                int bonus = combo_bonus[performances[i].id][performances[j].id];
                int total = dp[i][k] + added + bonus;

                if (dp[j][k + stage_change] < total) {
                    dp[j][k + stage_change] = total;
                    parent_perf[j][k + stage_change] = i;
                    parent_k[j][k + stage_change] = k;
                    arrival_time[j][k + stage_change] = start_watch;
                }
            }
        }
    }

    //STEP 8: Find Max Satisfaction
    int max_satisfaction = INF;
    int end_perf = -1, end_k = -1;
    for (int i = 0; i < P; i++) {
        for (int k = 0; k <= K; k++) {
            if (dp[i][k] > max_satisfaction) {
                max_satisfaction = dp[i][k];
                end_perf = i;
                end_k = k;
            }
        }
    }

    //STEP 9: Reconstruct Schedule
    int schedule_perf[MAX_P];
    int schedule_arrival[MAX_P];
    int schedule_departure[MAX_P];
    int schedule_len = 0;

    int curr_perf = end_perf;
    int curr_k = end_k;
    while (curr_perf != -1) {
        schedule_perf[schedule_len] = curr_perf;
        schedule_arrival[schedule_len] = arrival_time[curr_perf][curr_k];
        schedule_departure[schedule_len] = performances[curr_perf].end;
        int prev_perf = parent_perf[curr_perf][curr_k];
        int prev_k = parent_k[curr_perf][curr_k];
        curr_perf = prev_perf;
        curr_k = prev_k;
        schedule_len++;
    }

    // Reverse schedule for correct order
    for (int i = 0; i < schedule_len / 2; i++) {
        int tmp_p = schedule_perf[i];
        schedule_perf[i] = schedule_perf[schedule_len - 1 - i];
        schedule_perf[schedule_len - 1 - i] = tmp_p;

        int tmp_a = schedule_arrival[i];
        schedule_arrival[i] = schedule_arrival[schedule_len - 1 - i];
        schedule_arrival[schedule_len - 1 - i] = tmp_a;

        int tmp_d = schedule_departure[i];
        schedule_departure[i] = schedule_departure[schedule_len - 1 - i];
        schedule_departure[schedule_len - 1 - i] = tmp_d;
    }

    //STEP 10: Output Result
    printf("\nMaximum satisfaction points achievable\n");
    printf("%d\n", max_satisfaction);  //Print max satisfaction here
    printf("Schedule: [");
    for (int i = 0; i < schedule_len; i++) {
        printf("%d: %d-%d", schedule_perf[i], schedule_arrival[i], schedule_departure[i]);
        if (i != schedule_len - 1) printf(", ");
    }
    printf("]\n");


    return 0;
}
