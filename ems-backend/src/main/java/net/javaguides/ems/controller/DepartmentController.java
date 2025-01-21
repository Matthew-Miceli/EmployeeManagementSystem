package net.javaguides.ems.controller;


import lombok.AllArgsConstructor;
import net.javaguides.ems.dto.DepartmentDto;
import net.javaguides.ems.dto.EmployeeDto;
import net.javaguides.ems.service.DepartmentService;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/departments")
public class DepartmentController {

    private DepartmentService departmentService;

    // Build Add Department REST API
    @PostMapping
    public ResponseEntity<DepartmentDto> createDepartment(@RequestBody DepartmentDto departmentDto){
        DepartmentDto department = departmentService.createDepartment(departmentDto);
        return new ResponseEntity<>(department, HttpStatus.CREATED);
    }

    //Build Get Department REST API
    @GetMapping("{id}")
    public ResponseEntity<DepartmentDto> getDepartmentById(@PathVariable("id") Long departmentId){
        DepartmentDto department = departmentService.getDepartmentById(departmentId);
        return new ResponseEntity<>(department, HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<List<DepartmentDto>> getAllDepartments(){
        List<DepartmentDto> departments = departmentService.getAllDepartments();
        return new ResponseEntity<>(departments, HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<DepartmentDto> updateDepartment(@PathVariable("id") Long departmentId, @RequestBody DepartmentDto departmentDto){
        DepartmentDto department = departmentService.updateDepartment(departmentId, departmentDto);
        return new ResponseEntity<>(department, HttpStatus.OK);
    }

    //Build department REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteDepartment(@PathVariable("id") Long departmentId){
        departmentService.deleteDepartment(departmentId);
        return new ResponseEntity<>("Department has been deleted", HttpStatus.OK);
    }




}
