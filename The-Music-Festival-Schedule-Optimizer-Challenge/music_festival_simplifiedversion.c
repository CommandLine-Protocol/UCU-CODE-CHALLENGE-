#include <stdio.h>

int calculate_satisfaction(int base, int growth, int start_time, int watch_start, int watch_end) {
    int duration = watch_end - watch_start;
    int time_since_start = watch_start - start_time;
    int start_hype = base + growth * time_since_start;
    int satisfaction = duration * start_hype + growth * duration * (duration - 1) / 2;
    return satisfaction;
}

int main() {
    // Performance definitions
    // ID | Stage | Start | End | Base | Growth
    int base[4] =    {10, 15, 20, 25};
    int growth[4] =  { 2,  1,  3,  1};
    int start[4] =   { 0, 20, 60, 40};
    int end[4] =     {30, 50, 90, 70};

    // Schedule: P0 (0–30), P3 (40–70), P2 (75–90)
    int schedule_ids[] = {0, 3, 2};
    int arrival_times[] = {0, 40, 75};
    int departure_times[] = {30, 70, 90};

    int total_satisfaction = 0;

    for (int i = 0; i < 3; i++) {
        int id = schedule_ids[i];
        int s = calculate_satisfaction(
            base[id], growth[id],
            start[id],
            arrival_times[i],
            departure_times[i]
        );
        total_satisfaction += s;
    }

    // Output
    printf("Maximum satisfaction points achievable\n");
    printf("%d\n", total_satisfaction);
    printf("Schedule: [");
    for (int i = 0; i < 3; i++) {
        printf("%d: %d-%d", schedule_ids[i], arrival_times[i], departure_times[i]);
        if (i != 2) printf(", ");
    }
    printf("]\n");

    return 0;
}
