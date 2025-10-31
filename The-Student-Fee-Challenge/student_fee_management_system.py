import json
import os
import re
import csv
from datetime import datetime
from prettytable import PrettyTable

# ========== Utility Functions ==========

def load_data(filename):
    if not os.path.exists(filename):
        return []
    with open(filename, 'r') as f:
        return json.load(f)

def save_data(filename, data):
    with open(filename, 'w') as f:
        json.dump(data, f, indent=4)

# ========== Authentication ==========

ADMIN_FILE = 'admin.json'
MASTER_CODE = 'CLI-Protocol'

def setup_admin():
    if not os.path.exists(ADMIN_FILE):
        print("🔐 Initial admin setup required.")
        pin = input("Create a 6-digit admin PIN: ")
        if not re.fullmatch(r"\d{6}", pin):
            print("❌ PIN must be 6 digits.")
            return setup_admin()
        save_data(ADMIN_FILE, {"admin_pin": pin})
        print("✅ Admin PIN created successfully.")

def login():
    setup_admin()
    creds = load_data(ADMIN_FILE)
    for _ in range(3):
        pin = input("Enter 6-digit admin PIN: ")
        if pin == creds["admin_pin"]:
            print("✅ Login successful!\n")
            return True
        print("❌ Incorrect PIN.")
    forgot = input("Forgot PIN? (y/n): ").lower()
    if forgot == 'y':
        master = input("Enter master code: ")
        if master == MASTER_CODE:
            new_pin = input("Enter new 6-digit admin PIN: ")
            if not re.fullmatch(r"\d{6}", new_pin):
                print("❌ Invalid PIN format.")
                return False
            save_data(ADMIN_FILE, {"admin_pin": new_pin})
            print("✅ PIN reset successfully. Refreshing login...")
            return login()  # refresh page after PIN reset
        else:
            print("❌ Invalid master code.")
    return False

# ========== Data Classes ==========

class Student:
    def __init__(self, student_id, name, program, campus, year_of_study):
        self.student_id = student_id
        self.name = name
        self.program = program
        self.campus = campus
        self.year_of_study = year_of_study

    def to_dict(self):
        return self.__dict__

class FeeStructure:
    def __init__(self, program, year, total_fee):
        self.program = program
        self.year = year
        self.total_fee = total_fee

    def to_dict(self):
        return self.__dict__

class Payment:
    def __init__(self, payment_id, student_id, amount, date):
        self.payment_id = payment_id
        self.student_id = student_id
        self.amount = amount
        self.date = date

    def to_dict(self):
        return self.__dict__

# ========== Core Management Class ==========

class FeeTracker:
    def __init__(self):
        self.students_file = 'students.json'
        self.fees_file = 'fees.json'
        self.payments_file = 'payments.json'

        self.students = load_data(self.students_file)
        self.fees = load_data(self.fees_file)
        self.payments = load_data(self.payments_file)

    # ---------- Student Management ----------

    def add_student(self):
        while True:
            student_id = input("Enter Student ID (format S00B00/000): ").strip()
            if not re.fullmatch(r"S\d{2}B\d{2}/\d{3}", student_id):
                print("❌ Invalid ID format. Example: S00B00/000")
                continue
            break

        while True:
            name = input("Enter Name: ").strip()
            if not re.fullmatch(r"[A-Za-z ]+", name):
                print("❌ Name must contain letters only.")
                continue
            break

        program = input("Enter Program: ").strip()
        campus = input("Enter Campus (Main, Kampala, Mbale, Kabale): ").capitalize()
        if campus not in ["Main", "Kampala", "Mbale", "Kabale"]:
            print("❌ Invalid campus. Try again.")
            return
        year = int(input("Enter Year of Study: "))

        student = Student(student_id, name, program, campus, year)
        self.students.append(student.to_dict())
        save_data(self.students_file, self.students)
        print("✅ Student added successfully.")

    def edit_student(self):
        sid = input("Enter Student ID to edit: ").strip()
        student = next((s for s in self.students if s["student_id"] == sid), None)
        if not student:
            print("❌ Student not found.")
            return
        print("Leave blank to keep existing value.")
        name = input(f"Name [{student['name']}]: ") or student['name']
        program = input(f"Program [{student['program']}]: ") or student['program']
        campus = input(f"Campus [{student['campus']}]: ") or student['campus']
        year = input(f"Year [{student['year_of_study']}]: ") or student['year_of_study']
        student.update({"name": name, "program": program, "campus": campus, "year_of_study": int(year)})
        save_data(self.students_file, self.students)
        print("✅ Student updated successfully.")

    def delete_student(self):
        sid = input("Enter Student ID to delete: ").strip()
        student = next((s for s in self.students if s["student_id"] == sid), None)
        if not student:
            print("❌ Student not found.")
            return
        self.students.remove(student)
        save_data(self.students_file, self.students)
        print("✅ Student deleted successfully.")

    def view_students(self):
        if not self.students:
            print("No students found.")
            return
        table = PrettyTable(["ID", "Name", "Program", "Campus", "Year"])
        for s in self.students:
            table.add_row([s["student_id"], s["name"], s["program"], s["campus"], s["year_of_study"]])
        print(table)

    # ---------- Fee Structure ----------

    def define_fee_structure(self):
        program = input("Enter Program: ")
        year = int(input("Enter Year: "))
        total_fee = float(input("Enter Total Fee: "))
        if total_fee < 0:
            print("❌ Invalid value. Fee cannot be negative.")
            return
        for f in self.fees:
            if f["program"] == program and f["year"] == year:
                f["total_fee"] = total_fee
                break
        else:
            fee = FeeStructure(program, year, total_fee)
            self.fees.append(fee.to_dict())
        save_data(self.fees_file, self.fees)
        print("✅ Fee structure saved successfully.")

    def view_fee_structures(self):
        if not self.fees:
            print("No fee structures defined.")
            return
        table = PrettyTable(["Program", "Year", "Total Fee"])
        for f in self.fees:
            table.add_row([f["program"], f["year"], f["total_fee"]])
        print(table)

    # ---------- Payment Management ----------

    def record_payment(self):
        student_id = input("Enter Student ID: ").strip()
        student = next((s for s in self.students if s["student_id"] == student_id), None)
        if not student:
            print("❌ Student not found.")
            return

        fee = next((f for f in self.fees if f["program"] == student["program"] and f["year"] == student["year_of_study"]), None)
        if not fee:
            print("❌ Fee structure not defined for this program/year.")
            return

        total_paid = sum(p["amount"] for p in self.payments if p["student_id"] == student_id)
        balance = fee["total_fee"] - total_paid

        amount = float(input(f"Enter Payment Amount (Balance due {balance:.2f}): "))
        if amount < 0:
            print("❌ Invalid amount. Cannot be negative.")
            return
        if amount > balance:
            print(f"❌ Payment exceeds balance. You still owe {balance:.2f}")
            return

        payment_id = f"PAY-{len(self.payments)+1:03}"
        date = datetime.now().strftime("%Y-%m-%d")
        payment = Payment(payment_id, student_id, amount, date)
        self.payments.append(payment.to_dict())
        save_data(self.payments_file, self.payments)
        print(f"✅ Payment recorded successfully. Payment ID: {payment_id}, Date: {date}")

    # ---------- Reports ----------

    def compute_student_balance(self, student):
        fee = next((f for f in self.fees if f["program"] == student["program"] and f["year"] == student["year_of_study"]), None)
        if not fee:
            return 0, 0, "No Fee Info", "No Fee Info"
        total_fee = fee["total_fee"]
        total_paid = sum(p["amount"] for p in self.payments if p["student_id"] == student["student_id"])
        balance = total_fee - total_paid
        status = "Cleared" if balance == 0 else "Not Cleared"
        return total_fee, total_paid, balance, status

    def report_per_student(self):
        table = PrettyTable(["Name", "Program", "Campus", "Total Fee", "Paid", "Balance", "Status", "Payment IDs", "Payment Dates"])
        for s in self.students:
            total_fee, total_paid, balance, status = self.compute_student_balance(s)
            student_payments = [p for p in self.payments if p["student_id"] == s["student_id"]]
            payment_ids = ", ".join(p["payment_id"] for p in student_payments) if student_payments else "N/A"
            payment_dates = ", ".join(p["date"] for p in student_payments) if student_payments else "N/A"
            table.add_row([s["name"], s["program"], s["campus"], total_fee, total_paid, balance, status, payment_ids, payment_dates])
        print(table)


    def report_per_program(self):
        programs = set(f["program"] for f in self.fees)
        table = PrettyTable(["Program", "Total Expected Income", "Total Collected", "Outstanding Balance"])
        for program in programs:
            students = [s for s in self.students if s["program"] == program]
            expected = sum(next(f["total_fee"] for f in self.fees if f["program"] == program and f["year"] == s["year_of_study"]) for s in students)
            collected = sum(p["amount"] for p in self.payments if any(s["student_id"] == p["student_id"] for s in students))
            outstanding = expected - collected
            table.add_row([program, expected, collected, outstanding])
        print(table)

    def report_overall_summary(self):
        total_expected = sum(f["total_fee"] for f in self.fees)
        total_collected = sum(p["amount"] for p in self.payments)
        total_outstanding = total_expected - total_collected
        table = PrettyTable(["Total Expected Income", "Total Collected", "Outstanding Balance"])
        table.add_row([total_expected, total_collected, total_outstanding])
        print(table)

    # ---------- Search / Filter ----------

    def filter_records(self):
        print("Filter Options:")
        print("1) Program\n2) Campus\n3) Payment Status\n4) Student ID\n5) Payment ID\n6) Payment Date")
        choice = input("Choose filter (1-6): ").strip()

        if choice == '1':
            program = input("Enter Program: ")
            filtered = [s for s in self.students if s["program"].lower() == program.lower()]
            self.report_per_student_filtered(filtered)
        elif choice == '2':
            campus = input("Enter Campus: ").capitalize()
            filtered = [s for s in self.students if s["campus"] == campus]
            self.report_per_student_filtered(filtered)
        elif choice == '3':
            status = input("Enter Payment Status (Cleared/Not Cleared): ").capitalize()
            filtered = [s for s in self.students if self.compute_student_balance(s)[3] == status]
            self.report_per_student_filtered(filtered)
        elif choice == '4':
            sid = input("Enter Student ID: ")
            filtered = [s for s in self.students if s["student_id"] == sid]
            self.report_per_student_filtered(filtered)
        elif choice == '5':
            pid = input("Enter Payment ID: ")
            filtered = [p for p in self.payments if p["payment_id"] == pid]
            if not filtered:
                print("No payment found.")
                return
            table = PrettyTable(["Payment ID", "Student ID", "Amount", "Date"])
            for p in filtered:
                table.add_row([p["payment_id"], p["student_id"], p["amount"], p["date"]])
            print(table)
        elif choice == '6':
            date_filter = input("Enter Payment Date (YYYY-MM-DD): ")
            filtered = [p for p in self.payments if p["date"] == date_filter]
            if not filtered:
                print("No payment found.")
                return
            table = PrettyTable(["Payment ID", "Student ID", "Amount", "Date"])
            for p in filtered:
                table.add_row([p["payment_id"], p["student_id"], p["amount"], p["date"]])
            print(table)
        else:
            print("❌ Invalid choice.")

    def report_per_student_filtered(self, filtered):
        if not filtered:
            print("No records found.")
            return
        table = PrettyTable(["Name", "Program", "Campus", "Total Fee", "Paid", "Balance", "Status"])
        for s in filtered:
            total_fee, total_paid, balance, status = self.compute_student_balance(s)
            table.add_row([s["name"], s["program"], s["campus"], total_fee, total_paid, balance, status])
        print(table)

    # ---------- Export Data ----------

    def export_data(self):
        files = [self.students_file, self.fees_file, self.payments_file]
        print("\nAvailable JSON files:")
        for f in files:
            print(f"- {f}")
        filename = input("\nEnter file to export (exact name): ")
        if filename not in files:
            print("❌ File not found.")
            return
        data = load_data(filename)
        if not data:
            print("❌ No data to export.")
            return
        csv_file = filename.replace('.json', '.csv')
        with open(csv_file, 'w', newline='') as f:
            writer = csv.DictWriter(f, fieldnames=data[0].keys())
            writer.writeheader()
            writer.writerows(data)
        print(f"✅ Data exported successfully to {csv_file}")

    # ---------- Main Menu ----------

    def run(self):
        if not login():
            print("Exiting system.")
            return

        while True:
            print("\n===== STUDENT FEE MANAGEMENT SYSTEM =====")
            print("1. Add Student")
            print("2. Edit Student")
            print("3. Delete Student")
            print("4. View Students")
            print("5. Define Fee Structure")
            print("6. View Fee Structures")
            print("7. Record Payment")
            print("8. Report Per Student")
            print("9. Report Per Program")
            print("10. Overall Summary")
            print("11. Filter/Search Records")
            print("12. Export Data")
            print("0. Exit")

            choice = input("Enter choice: ").strip()
            if choice == '1': self.add_student()
            elif choice == '2': self.edit_student()
            elif choice == '3': self.delete_student()
            elif choice == '4': self.view_students()
            elif choice == '5': self.define_fee_structure()
            elif choice == '6': self.view_fee_structures()
            elif choice == '7': self.record_payment()
            elif choice == '8': self.report_per_student()
            elif choice == '9': self.report_per_program()
            elif choice == '10': self.report_overall_summary()
            elif choice == '11': self.filter_records()
            elif choice == '12': self.export_data()
            elif choice == '0':
                print("Goodbye")
                break
            else:
                print("❌ Invalid option. Try again.")

# Run Application
if __name__ == "__main__":
    app = FeeTracker()
    app.run()
