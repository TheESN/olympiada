from openpyxl import load_workbook

class SchoolParser():
    def parse_excel(self, filename):
        wb = load_workbook(filename=filename)
        ws = wb.active

    def load_schools(self, worksheet):
        for row in worksheet.iter_rows(min_row=2):
            self.load_school(row)

    def load_school(self, row):
        pass


