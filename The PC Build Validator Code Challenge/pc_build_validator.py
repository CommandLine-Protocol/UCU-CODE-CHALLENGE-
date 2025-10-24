# Step 1: Print user manual reference before input
print("Please refer to the user manual for input format and syntax before entering data.\n")

# Step 2: Define Component classes and store in dictionary
class Component:
    def __init__(self, component_id, type_, performance_score, cost, spec1, spec2):
        self.component_id = component_id
        self.type = type_
        self.performance_score = int(performance_score)
        self.cost = int(cost)
        self.spec1 = spec1
        self.spec2 = spec2
        # Validate input when initializing
        if self.performance_score < 0 or self.cost < 0:
            raise ValueError(f"Invalid numeric value for component {component_id}")
        if type_ == "CPU":
            self.socket = spec1
            self.tdp = int(spec2)
        elif type_ == "Motherboard":
            self.socket = spec1
            self.ram_type = spec2
        elif type_ == "GPU":
            self.tdp = int(spec2)
        elif type_ == "RAM":
            self.ram_type = spec1
        elif type_ == "PSU":
            self.wattage = int(spec1)

# Step 3: Collect user input with confirmation
while True:
    total_budget = int(input("Enter total budget: "))
    num_components = int(input("Enter number of components: "))

    inventory = {}
    for _ in range(num_components):
        line = input("Enter component (component_id type performance_score cost spec1 spec2): ").split()
        comp_id, comp_type, perf, cost, spec1, spec2 = line
        inventory[comp_id] = Component(comp_id, comp_type, perf, cost, spec1, spec2)

    num_kits = int(input("Enter number of build kits: "))
    build_kits = []
    for _ in range(num_kits):
        line = input("Enter build kit (kit_id cpu_id mobo_id gpu_id ram_id psu_id): ").split()
        build_kits.append(line)

    # Print input summary for user verification
    print("\n--- Current Inventory & Build Kits ---")
    print(f"{'Field':<25} {'Value'}")
    print(f"{'Total Budget':<25} {total_budget}")
    print(f"{'Number of Components':<25} {num_components}")

    print("\nComponents:")
    for comp in inventory.values():
        print(f"{comp.component_id:<10} {comp.type:<12} Score:{comp.performance_score:<5} Cost:{comp.cost:<5} Spec1:{comp.spec1:<8} Spec2:{comp.spec2}")

    print(f"\nNumber of Build Kits: {num_kits}")
    for kit in build_kits:
        print(f"Kit ID: {kit[0]}, CPU: {kit[1]}, Motherboard: {kit[2]}, GPU: {kit[3]}, RAM: {kit[4]}, PSU: {kit[5]}")
    print("\n--- End of Input ---\n")

    proceed = input("Do you want to proceed with this input? (Y/N): ").strip().upper()
    if proceed == "Y":
        break
    print("Please re-enter the input.\n")

# Step 4: Build validation function
def validate_build(build):
    kit_id, cpu_id, mobo_id, gpu_id, ram_id, psu_id = build
    reasons = []
    valid = True

    # Check for missing components
    missing = []
    for cid in [cpu_id, mobo_id, gpu_id, ram_id, psu_id]:
        if cid not in inventory:
            missing.append(cid)
    if missing:
        reasons.append(f"Missing components: {', '.join(missing)}")
        return False, reasons, 0, 0

    cpu = inventory[cpu_id]
    mobo = inventory[mobo_id]
    gpu = inventory[gpu_id]
    ram = inventory[ram_id]
    psu = inventory[psu_id]

    # Budget check
    total_cost = cpu.cost + mobo.cost + gpu.cost + ram.cost + psu.cost
    if total_cost > total_budget:
        valid = False
        reasons.append("Over budget")

    # Compatibility checks
    if hasattr(cpu, 'socket') and hasattr(mobo, 'socket') and cpu.socket != mobo.socket:
        valid = False
        reasons.append("CPU and Motherboard socket mismatch")
    if hasattr(ram, 'ram_type') and hasattr(mobo, 'ram_type') and ram.ram_type != mobo.ram_type:
        valid = False
        reasons.append("RAM and Motherboard type mismatch")
    if hasattr(psu, 'wattage') and hasattr(cpu, 'tdp') and hasattr(gpu, 'tdp'):
        if psu.wattage < cpu.tdp + gpu.tdp + 50:
            valid = False
            reasons.append("PSU wattage insufficient")

    total_score = cpu.performance_score + mobo.performance_score + gpu.performance_score + ram.performance_score + psu.performance_score
    return valid, reasons, total_cost, total_score

# Step 5: Evaluate all builds
results = []
best_score = 0
best_kit = "NONE"

for kit in build_kits:
    valid, reasons, cost, score = validate_build(kit)
    results.append({
        "kit_id": kit[0],
        "valid": valid,
        "reasons": reasons,
        "cost": cost,
        "score": score
    })
    if valid and score > best_score:
        best_score = score
        best_kit = kit[0]

# Step 6: Print summary results first
print(f"\nMaximum Score: {best_score}")
print(f"Best Build: {best_kit}")

for res in results:
    if not res["valid"]:
        print(f"Build {res['kit_id']} failed: {', '.join(res['reasons'])}")
    elif res["kit_id"] != best_kit:
        print(f"Build {res['kit_id']} passed: Score is less than {best_kit}")

# Ask if user wants detailed report
choice = input("\nDo you want to proceed with detailed report? (Y/N): ").strip().upper()
if choice != "Y":
    print("Exiting program. Goodbye!")
    exit()

# Step 7: Detailed structured report
print("\nDetailed PC Build Validator Report\n")

print("Budget Check:")
for res in results:
    status = "✅" if res["cost"] <= total_budget else "❌"
    print(f"{res['kit_id']}: {res['cost']} (under {total_budget}) {status}")

print("\nCompatibility Check:")
for res in results:
    if not res["valid"]:
        print(f"{res['kit_id']} fails: {', '.join(res['reasons'])} ❌")
    else:
        print(f"{res['kit_id']} passes all checks ✅")

print("\nPerformance Score:")
for res in results:
    note = ""
    if not res["valid"]:
        note = "(ignored due to incompatibility)"
    elif res["kit_id"] == best_kit:
        note = "✅ (best build)"
    print(f"{res['kit_id']}: {res['score']} {note}")

print(f"\nWinner: {best_kit} with {best_score} points.")
