import React, { useState } from 'react';
import { X } from 'lucide-react';

const SurgicalStagesUI = () => {
  const [selectedStage, setSelectedStage] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showExecutiveSummary, setShowExecutiveSummary] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // Helper functions
  const onClose = () => {
    setSelectedStage(null);
    setSelectedOrder(null);
  };

  const closeExecutiveSummary = () => {
    setShowExecutiveSummary(false);
  };
  
  // Scroll to top when Executive Summary opens
  React.useEffect(() => {
    if (showExecutiveSummary) {
      // Scroll the modal content to top when it opens
      setTimeout(() => {
        const modalContent = document.querySelector('.executive-summary-content');
        if (modalContent) {
          modalContent.scrollTop = 0;
        }
        // Also scroll the outer overlay container to top
        const overlay = document.querySelector('.executive-summary-overlay');
        if (overlay) {
          overlay.scrollTop = 0;
        }
      }, 50);
    }
  }, [showExecutiveSummary]);
  
  // Handle ESC key to close modals
  React.useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        if (showExecutiveSummary) {
          closeExecutiveSummary();
        } else if (selectedStage) {
          onClose();
        }
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [showExecutiveSummary, selectedStage]);
  
  // Simplified orders data structure
  const createSubStage = (name, completed, by, date, time) => ({
    name,
    completed,
    completedBy: completed ? by : null,
    completedDate: completed ? date : null,
    completedTime: completed ? time : null
  });

  const createStageStatus = (status, date, subStages, canCancel = false) => ({
    status,
    date,
    cancelled: canCancel ? false : undefined,
    cancelReason: canCancel ? '' : undefined,
    reschedule: canCancel ? false : undefined,
    followUp: canCancel ? false : undefined,
    subStages
  });

  const orders = [
    {
      id: 1,
      patientInfo: {
        branch: 'Tahlia',
        patientName: 'Ali Ahmed',
        patientId: '363663',
        mobile: '0541516413',
        doctor: 'Dr.Domniuque',
        specialist: 'Orthopedic',
        reqDate: '01/11/2026',
        admReqDate: '01/11/2026',
        regNumber: '58775',
        approvalValidity: '01/11/2026'
      },
      surgeries: [
        { name: 'Arthroscopic Meniscal repair', approved: true },
        { name: 'POSTERIOR TLIF', approved: true }
      ],
      currentStage: 'anesthesia',
      stageStatuses: {
        approval: createStageStatus('approved', '01/11/2026', [
          createSubStage('Approved', true, 'Admin', '01/11/2026', '10:30 AM'),
          createSubStage('Rejected', false),
          createSubStage('Partially Approved', false)
        ], true),
        preOp: createStageStatus('completed', '05/11/2026', [
          createSubStage('Patient Contacted', true, 'Nurse Sara', '05/11/2026', '09:00 AM'),
          createSubStage('Lab Started', true, 'Lab Tech', '05/11/2026', '10:15 AM'),
          createSubStage('Lab Completed', true, 'Lab Tech', '05/11/2026', '02:30 PM'),
          createSubStage('Anesthesia Booking', true, 'Coordinator', '05/11/2026', '03:00 PM')
        ], true),
        anesthesia: createStageStatus('in-progress', null, [
          createSubStage('Need Medical Clearance', true, 'Dr.Ahmed', '06/11/2026', '11:00 AM'),
          createSubStage('Anesthesia Clear', false)
        ], true),
        operationBooking: createStageStatus('pending', null, [
          createSubStage('Booked', false),
          createSubStage('Confirmed', false),
          createSubStage('Surgical Confirmation', false),
          createSubStage('Material Confirmation', false)
        ], true),
        admission: createStageStatus('pending', null, [
          createSubStage('Admitted', false),
          createSubStage('Surgery Performed', false),
          createSubStage('Surgery Rescheduled', false),
          createSubStage('Cancelled with Reason', false)
        ]),
        reporting: createStageStatus('pending', null, [
          createSubStage('Report Done', false)
        ]),
        billing: createStageStatus('pending', null, [
          createSubStage('Billed', false)
        ]),
        postOp: createStageStatus('pending', null, [
          createSubStage('48 Hour Call', false),
          createSubStage('Follow-up Appointment', false),
          createSubStage('Physical Therapy', false),
          createSubStage('Post-op Medication', false)
        ])
      },
      isActive: true
    },
    {
      id: 2,
      patientInfo: {
        branch: 'Manar',
        patientName: 'Sara Mohammed',
        patientId: '363664',
        mobile: '0551234567',
        doctor: 'Dr.Smith',
        specialist: 'General Surgery',
        reqDate: '03/11/2026',
        admReqDate: '03/11/2026',
        regNumber: '58776',
        approvalValidity: '03/11/2026'
      },
      surgeries: [
        { name: 'Laparoscopic Cholecystectomy', approved: true }
      ],
      currentStage: 'postOp',
      stageStatuses: {
        approval: createStageStatus('approved', '03/11/2026', [
          createSubStage('Approved', true, 'Admin', '03/11/2026', '09:00 AM'),
          createSubStage('Rejected', false),
          createSubStage('Partially Approved', false)
        ], true),
        preOp: createStageStatus('completed', '06/11/2026', [
          createSubStage('Patient Contacted', true, 'Nurse Sara', '06/11/2026', '08:00 AM'),
          createSubStage('Lab Started', true, 'Lab Tech', '06/11/2026', '09:30 AM'),
          createSubStage('Lab Completed', true, 'Lab Tech', '06/11/2026', '01:00 PM'),
          createSubStage('Anesthesia Booking', true, 'Coordinator', '06/11/2026', '02:00 PM')
        ], true),
        anesthesia: createStageStatus('completed', '08/11/2026', [
          createSubStage('Need Medical Clearance', true, 'Dr.Ahmed', '08/11/2026', '10:00 AM'),
          createSubStage('Anesthesia Clear', true, 'Dr.Anesthesia', '08/11/2026', '11:30 AM')
        ], true),
        operationBooking: createStageStatus('completed', '08/11/2026', [
          createSubStage('Booked', true, 'OR Scheduler', '08/11/2026', '02:00 PM'),
          createSubStage('Confirmed', true, 'OR Manager', '09/11/2026', '09:00 AM'),
          createSubStage('Surgical Confirmation', true, 'Surgeon', '09/11/2026', '10:00 AM'),
          createSubStage('Material Confirmation', true, 'Supply', '09/11/2026', '11:00 AM')
        ], true),
        admission: createStageStatus('completed', '10/11/2026', [
          createSubStage('Admitted', true, 'Admission Nurse', '10/11/2026', '07:00 AM'),
          createSubStage('Surgery Performed', true, 'Dr.Smith', '10/11/2026', '10:00 AM'),
          createSubStage('Surgery Rescheduled', false),
          createSubStage('Cancelled with Reason', false)
        ]),
        reporting: createStageStatus('completed', '10/11/2026', [
          createSubStage('Report Done', true, 'Medical Records', '10/11/2026', '03:00 PM')
        ]),
        billing: createStageStatus('completed', '11/11/2026', [
          createSubStage('Billed', true, 'Billing Dept', '11/11/2026', '09:00 AM')
        ]),
        postOp: createStageStatus('in-progress', null, [
          createSubStage('48 Hour Call', true, 'Nurse Alice', '12/11/2026', '10:00 AM'),
          createSubStage('Follow-up Appointment', true, 'Receptionist', '13/11/2026', '02:00 PM'),
          createSubStage('Physical Therapy', false),
          createSubStage('Post-op Medication', false)
        ])
      },
      isActive: true
    },
    {
      id: 3,
      patientInfo: {
        branch: 'King Road',
        patientName: 'Mohammed Hassan',
        patientId: '363665',
        mobile: '0523456789',
        doctor: 'Dr.Abdullah',
        specialist: 'Cardiology',
        reqDate: '05/11/2026',
        admReqDate: '05/11/2026',
        regNumber: '58777',
        approvalValidity: '05/11/2026'
      },
      surgeries: [
        { name: 'CABG', approved: true },
        { name: 'Valve Replacement', approved: false },
        { name: 'Pacemaker', approved: true }
      ],
      currentStage: 'approval',
      stageStatuses: {
        approval: createStageStatus('partial', '05/11/2026', [
          createSubStage('Approved', true, 'Insurance', '05/11/2026', '11:00 AM'),
          createSubStage('Rejected', false),
          createSubStage('Partially Approved', true, 'Insurance', '05/11/2026', '11:00 AM')
        ], true),
        preOp: createStageStatus('pending', null, [
          createSubStage('Patient Contacted', false),
          createSubStage('Lab Started', false),
          createSubStage('Lab Completed', false),
          createSubStage('Anesthesia Booking', false)
        ], true),
        anesthesia: createStageStatus('pending', null, [
          createSubStage('Need Medical Clearance', false),
          createSubStage('Anesthesia Clear', false)
        ], true),
        operationBooking: createStageStatus('pending', null, [
          createSubStage('Booked', false),
          createSubStage('Confirmed', false),
          createSubStage('Surgical Confirmation', false),
          createSubStage('Material Confirmation', false)
        ], true),
        admission: createStageStatus('pending', null, [
          createSubStage('Admitted', false),
          createSubStage('Surgery Performed', false),
          createSubStage('Surgery Rescheduled', false),
          createSubStage('Cancelled with Reason', false)
        ]),
        reporting: createStageStatus('pending', null, [
          createSubStage('Report Done', false)
        ]),
        billing: createStageStatus('pending', null, [
          createSubStage('Billed', false)
        ]),
        postOp: createStageStatus('pending', null, [
          createSubStage('48 Hour Call', false),
          createSubStage('Follow-up Appointment', false),
          createSubStage('Physical Therapy', false),
          createSubStage('Post-op Medication', false)
        ])
      },
      isActive: true
    },
    {
      id: 4,
      patientInfo: {
        branch: 'Tahlia',
        patientName: 'Fatima Al-Rashid',
        patientId: '363666',
        mobile: '0534567890',
        doctor: 'Dr.Reem',
        specialist: 'Neurosurgery',
        reqDate: '07/11/2026',
        admReqDate: '07/11/2026',
        regNumber: '58778',
        approvalValidity: '07/11/2026'
      },
      surgeries: [
        { name: 'Lumbar Discectomy', approved: true },
        { name: 'Spinal Fusion L4-L5', approved: true }
      ],
      currentStage: 'operationBooking',
      stageStatuses: {
        approval: createStageStatus('approved', '07/11/2026', [
          createSubStage('Approved', true, 'Admin', '07/11/2026', '08:00 AM'),
          createSubStage('Rejected', false),
          createSubStage('Partially Approved', false)
        ], true),
        preOp: createStageStatus('completed', '09/11/2026', [
          createSubStage('Patient Contacted', true, 'Nurse Hala', '09/11/2026', '08:30 AM'),
          createSubStage('Lab Started', true, 'Lab Staff', '09/11/2026', '10:00 AM'),
          createSubStage('Lab Completed', true, 'Lab Staff', '09/11/2026', '02:00 PM'),
          createSubStage('Anesthesia Booking', true, 'Coordinator', '09/11/2026', '03:00 PM')
        ], true),
        anesthesia: createStageStatus('completed', '10/11/2026', [
          createSubStage('Need Medical Clearance', true, 'Dr.Khalid', '10/11/2026', '09:00 AM'),
          createSubStage('Anesthesia Clear', true, 'Dr.Anesthesia', '10/11/2026', '10:30 AM')
        ], true),
        operationBooking: createStageStatus('in-progress', null, [
          createSubStage('Booked', true, 'OR Scheduler', '11/11/2026', '09:00 AM'),
          createSubStage('Confirmed', true, 'OR Manager', '11/11/2026', '10:00 AM'),
          createSubStage('Surgical Confirmation', false),
          createSubStage('Material Confirmation', false)
        ], true),
        admission: createStageStatus('pending', null, [
          createSubStage('Admitted', false),
          createSubStage('Surgery Performed', false),
          createSubStage('Surgery Rescheduled', false),
          createSubStage('Cancelled with Reason', false)
        ]),
        reporting: createStageStatus('pending', null, [
          createSubStage('Report Done', false)
        ]),
        billing: createStageStatus('pending', null, [
          createSubStage('Billed', false)
        ]),
        postOp: createStageStatus('pending', null, [
          createSubStage('48 Hour Call', false),
          createSubStage('Follow-up Appointment', false),
          createSubStage('Physical Therapy', false),
          createSubStage('Post-op Medication', false)
        ])
      },
      isActive: true
    },
    {
      id: 5,
      patientInfo: {
        branch: 'Manar',
        patientName: 'Khalid Mansour',
        patientId: '363667',
        mobile: '0545678901',
        doctor: 'Dr.Fahad',
        specialist: 'Orthopedic Surgery',
        reqDate: '08/11/2026',
        admReqDate: '08/11/2026',
        regNumber: '58779',
        approvalValidity: '08/11/2026'
      },
      surgeries: [
        { name: 'Total Knee Replacement', approved: true },
        { name: 'Meniscus Repair', approved: false },
        { name: 'ACL Reconstruction', approved: false }
      ],
      currentStage: 'preOp',
      stageStatuses: {
        approval: createStageStatus('partial', '08/11/2026', [
          createSubStage('Approved', true, 'Insurance', '08/11/2026', '10:00 AM'),
          createSubStage('Rejected', false),
          createSubStage('Partially Approved', true, 'Insurance', '08/11/2026', '10:00 AM')
        ], true),
        preOp: createStageStatus('in-progress', null, [
          createSubStage('Patient Contacted', true, 'Nurse Fatima', '09/11/2026', '08:00 AM'),
          createSubStage('Lab Started', true, 'Lab Tech Omar', '09/11/2026', '09:00 AM'),
          createSubStage('Lab Completed', false),
          createSubStage('Anesthesia Booking', false)
        ], true),
        anesthesia: createStageStatus('pending', null, [
          createSubStage('Need Medical Clearance', false),
          createSubStage('Anesthesia Clear', false)
        ], true),
        operationBooking: createStageStatus('pending', null, [
          createSubStage('Booked', false),
          createSubStage('Confirmed', false),
          createSubStage('Surgical Confirmation', false),
          createSubStage('Material Confirmation', false)
        ], true),
        admission: createStageStatus('pending', null, [
          createSubStage('Admitted', false),
          createSubStage('Surgery Performed', false),
          createSubStage('Surgery Rescheduled', false),
          createSubStage('Cancelled with Reason', false)
        ]),
        reporting: createStageStatus('pending', null, [
          createSubStage('Report Done', false)
        ]),
        billing: createStageStatus('pending', null, [
          createSubStage('Billed', false)
        ]),
        postOp: createStageStatus('pending', null, [
          createSubStage('48 Hour Call', false),
          createSubStage('Follow-up Appointment', false),
          createSubStage('Physical Therapy', false),
          createSubStage('Post-op Medication', false)
        ])
      },
      isActive: true
    }
  ];

  const getApprovalColor = (status) => {
    const colors = {
      'approved': 'bg-green-700',
      'partial': 'bg-orange-500',
      'rejected': 'bg-red-600',
      'pending': 'bg-yellow-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  const getStageColor = (status) => {
    if (status === 'completed' || status === 'approved') return 'bg-green-700';
    if (status === 'in-progress') return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Surgical Orders Management</h1>
          <button onClick={() => setShowExecutiveSummary(true)} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow-lg font-semibold">
            Executive Summary
          </button>
        </div>

        {/* Collapsible Filter Section */}
        <div className="bg-white rounded-lg shadow p-3 mb-4 border border-gray-300">
          <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowFilters(!showFilters)}>
            <div className="flex items-center space-x-2">
              <h2 className="text-sm font-bold text-gray-800">Filters</h2>
              <span className="text-xs text-gray-500">({showFilters ? 'Click to collapse' : 'Click to expand'})</span>
            </div>
            <div className="flex items-center space-x-2">
              {showFilters && (
                <button 
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Clear filters logic here
                  }}
                >
                  Clear
                </button>
              )}
              <svg 
                className={`w-5 h-5 text-gray-600 transition-transform ${showFilters ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          {showFilters && (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 mt-3 pt-3 border-t border-gray-200">
              <input 
                type="text" 
                placeholder="Patient Name/ID" 
                className="p-1.5 border rounded text-xs"
              />
              
              <select className="p-1.5 border rounded text-xs">
                <option>All Branches</option>
                <option>Tahlia</option>
                <option>Manar</option>
                <option>King Road</option>
              </select>

              <select className="p-1.5 border rounded text-xs">
                <option>All Stages</option>
                <option>Approval</option>
                <option>Pre-Op</option>
                <option>Anesthesia</option>
                <option>OR Booking</option>
                <option>Admission</option>
              </select>

              <select className="p-1.5 border rounded text-xs">
                <option>All Status</option>
                <option>Approved</option>
                <option>Pending</option>
                <option>Partial</option>
                <option>Rejected</option>
              </select>

              <input 
                type="date" 
                placeholder="Req Date From"
                className="p-1.5 border rounded text-xs"
              />

              <input 
                type="date" 
                placeholder="Req Date To"
                className="p-1.5 border rounded text-xs"
              />

              <input 
                type="date" 
                placeholder="Approval From"
                className="p-1.5 border rounded text-xs"
              />

              <input 
                type="date" 
                placeholder="Approval To"
                className="p-1.5 border rounded text-xs"
              />

              <select className="p-1.5 border rounded text-xs">
                <option>All Doctors</option>
                <option>Dr.Domniuque</option>
                <option>Dr.Smith</option>
                <option>Dr.Abdullah</option>
              </select>

              <select className="p-1.5 border rounded text-xs">
                <option>All Specialists</option>
                <option>Orthopedic</option>
                <option>General Surgery</option>
                <option>Cardiology</option>
              </select>

              <select className="p-1.5 border rounded text-xs">
                <option>All Flags</option>
                <option>Cancelled</option>
                <option>Rescheduled</option>
                <option>Follow-up</option>
              </select>

              <button className="p-1.5 bg-blue-600 text-white rounded text-xs font-semibold hover:bg-blue-700">
                Search
              </button>
            </div>
          )}
        </div>
        
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white border-4 border-gray-800">
              <div className="p-4 border-b-2 border-gray-800">
                <div className="grid grid-cols-3 gap-8">
                  <div className="space-y-1">
                    <p className="text-sm"><span className="font-bold">Branch : </span>{order.patientInfo.branch}</p>
                    <p className="text-sm"><span className="font-bold">Patient : </span>{order.patientInfo.patientName}</p>
                    <p className="text-sm"><span className="font-bold">ID : </span>{order.patientInfo.patientId}</p>
                    <p className="text-sm"><span className="font-bold">Mobile : </span>{order.patientInfo.mobile}</p>
                  </div>

                  <div>
                    <p className="text-sm font-bold mb-2">Surgery Service List</p>
                    <div className="space-y-1">
                      {order.surgeries.map((surgery, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          {surgery.approved ? (
                            <span className="text-green-600 font-bold text-sm">✓</span>
                          ) : (
                            <span className="text-red-600 font-bold text-sm">✗</span>
                          )}
                          <p className="text-xs flex-1">{surgery.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm"><span className="font-bold">Doctor : </span>{order.patientInfo.doctor}</p>
                    <p className="text-sm"><span className="font-bold">Specialist : </span>{order.patientInfo.specialist}</p>
                    <p className="text-sm"><span className="font-bold">Req Date : </span>{order.patientInfo.reqDate}</p>
                    <p className="text-sm"><span className="font-bold">Reg Number : </span>{order.patientInfo.regNumber}</p>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-8 gap-0">
                  {[
                    { key: 'approval', title: 'Approval', useApprovalColor: true },
                    { key: 'preOp', title: 'Pre-Op' },
                    { key: 'anesthesia', title: 'Anesthesia' },
                    { key: 'operationBooking', title: 'Operation Booking' },
                    { key: 'admission', title: 'Admission' },
                    { key: 'reporting', title: 'Reporting' },
                    { key: 'billing', title: 'Billing' },
                    { key: 'postOp', title: 'Post-Op' }
                  ].map((stage) => {
                    const status = order.stageStatuses[stage.key];
                    const isCurrent = stage.key === order.currentStage;
                    const bgColor = stage.useApprovalColor ? getApprovalColor(status.status) : getStageColor(status.status);
                    
                    return (
                      <button
                        key={stage.key}
                        onClick={() => {
                          setSelectedOrder(order);
                          setSelectedStage(stage.key);
                        }}
                        className={`${bgColor} text-white py-4 px-2 border-r border-white last:border-r-0 hover:opacity-80 relative ${isCurrent ? 'ring-4 ring-inset ring-blue-400' : ''}`}
                      >
                        {status.cancelled && (
                          <div className="absolute top-1 right-1 bg-red-600 text-white text-xs px-1 rounded">CANCELLED</div>
                        )}
                        {status.reschedule && (
                          <div className="absolute top-1 left-1 bg-orange-500 text-white text-xs px-1 rounded">RESCHED</div>
                        )}
                        {status.followUp && (
                          <div className="absolute bottom-1 right-1 bg-blue-500 text-white text-xs px-1 rounded">F/U</div>
                        )}
                        <div className="text-center">
                          <p className="font-bold text-sm">{stage.title}</p>
                          {status.date && <p className="text-xs mt-1">{status.date}</p>}
                          
                          <div className="flex justify-center gap-0.5 mt-2">
                            {status.subStages && status.subStages.map((subStage, idx) => (
                              <div 
                                key={idx}
                                className={`w-2 h-2 rounded-sm border border-white ${
                                  subStage.completed ? 'bg-white' : 'bg-transparent'
                                }`}
                                title={subStage.name}
                              ></div>
                            ))}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showExecutiveSummary && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 overflow-auto py-8 px-4 executive-summary-overlay" 
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeExecutiveSummary();
            }
          }}
        >
          {/* Close Button - Normal Size */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              closeExecutiveSummary();
            }}
            className="fixed top-6 right-6 z-[100] bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 py-2 shadow-lg transition-all hover:scale-105 flex items-center gap-2"
            title="Close"
          >
            <X className="w-5 h-5" />
            <span className="text-sm font-semibold">Close</span>
          </button>

          <div 
            className="bg-white rounded-lg shadow-2xl w-full max-w-6xl flex flex-col max-h-[90vh]" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header - Always visible at top */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex justify-between items-center flex-shrink-0">
              <div className="flex-1">
                <h2 className="text-2xl font-bold">Executive Summary Dashboard</h2>
                <p className="text-sm text-blue-100">Surgical Orders Management Overview</p>
              </div>
            </div>
            
            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1 bg-gray-50 p-6 executive-summary-content">
              {/* Top-Line Metrics */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-600">
                  <div className="text-3xl font-bold text-gray-800">{orders.length}</div>
                  <div className="text-sm text-gray-600">Total Orders</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-600">
                  <div className="text-3xl font-bold text-gray-800">
                    {orders.filter(o => o.stageStatuses.approval.status === 'approved').length}
                  </div>
                  <div className="text-sm text-gray-600">Fully Approved</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border-l-4 border-orange-600">
                  <div className="text-3xl font-bold text-gray-800">
                    {orders.filter(o => o.stageStatuses.approval.status === 'partial').length}
                  </div>
                  <div className="text-sm text-gray-600">Partial Approval</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border-l-4 border-purple-600">
                  <div className="text-3xl font-bold text-gray-800">
                    {(orders.filter(o => o.stageStatuses.approval.status === 'approved' || o.stageStatuses.approval.status === 'partial').length / orders.length * 100).toFixed(0)}%
                  </div>
                  <div className="text-sm text-gray-600">Approval Rate</div>
                </div>
              </div>

              {/* Pipeline by Stage */}
              <div className="bg-white p-6 rounded-lg shadow mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">📊 Pipeline by Current Stage</h3>
                <div className="space-y-3">
                  {[
                    { key: 'approval', label: 'Approval', color: 'bg-blue-500' },
                    { key: 'preOp', label: 'Pre-Op', color: 'bg-indigo-500' },
                    { key: 'anesthesia', label: 'Anesthesia', color: 'bg-purple-500' },
                    { key: 'operationBooking', label: 'Operation Booking', color: 'bg-pink-500' },
                    { key: 'admission', label: 'Admission', color: 'bg-red-500' },
                    { key: 'reporting', label: 'Reporting', color: 'bg-orange-500' },
                    { key: 'billing', label: 'Billing', color: 'bg-yellow-500' },
                    { key: 'postOp', label: 'Post-Op', color: 'bg-green-500' }
                  ].map(stage => {
                    const count = orders.filter(o => o.currentStage === stage.key).length;
                    const percentage = (count / orders.length * 100).toFixed(0);
                    return (
                      <div key={stage.key} className="flex items-center">
                        <div className="w-32 text-sm font-semibold text-gray-700">{stage.label}</div>
                        <div className="flex-1 bg-gray-200 rounded-full h-8 relative">
                          <div 
                            className={`${stage.color} h-8 rounded-full flex items-center justify-end pr-3 text-white font-bold text-sm transition-all`}
                            style={{ width: `${Math.max(percentage, 5)}%` }}
                          >
                            {count > 0 && `${count} (${percentage}%)`}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                {/* Branch Performance */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">🏥 Branch Performance</h3>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-gray-300">
                        <th className="text-left py-2 font-bold">Branch</th>
                        <th className="text-center py-2 font-bold">Orders</th>
                        <th className="text-center py-2 font-bold">Completed</th>
                        <th className="text-center py-2 font-bold">Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {['Tahlia', 'Manar', 'King Road'].map(branch => {
                        const branchOrders = orders.filter(o => o.patientInfo.branch === branch);
                        const completed = branchOrders.filter(o => 
                          o.currentStage === 'postOp' || o.currentStage === 'billing'
                        ).length;
                        const rate = branchOrders.length > 0 ? (completed / branchOrders.length * 100).toFixed(0) : 0;
                        return (
                          <tr key={branch} className="border-b border-gray-200">
                            <td className="py-2 font-semibold">{branch}</td>
                            <td className="text-center py-2">{branchOrders.length}</td>
                            <td className="text-center py-2">{completed}</td>
                            <td className="text-center py-2">
                              <span className={`px-2 py-1 rounded ${rate >= 50 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                {rate}%
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Specialist Workload */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">👨‍⚕️ Specialist Workload</h3>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-gray-300">
                        <th className="text-left py-2 font-bold">Specialist</th>
                        <th className="text-center py-2 font-bold">Orders</th>
                        <th className="text-center py-2 font-bold">Active</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from(new Set(orders.map(o => o.patientInfo.specialist))).map(specialist => {
                        const specialistOrders = orders.filter(o => o.patientInfo.specialist === specialist);
                        const active = specialistOrders.filter(o => 
                          o.currentStage !== 'postOp' && o.currentStage !== 'billing'
                        ).length;
                        return (
                          <tr key={specialist} className="border-b border-gray-200">
                            <td className="py-2 font-semibold">{specialist}</td>
                            <td className="text-center py-2">{specialistOrders.length}</td>
                            <td className="text-center py-2">
                              <span className="px-2 py-1 rounded bg-blue-100 text-blue-800">
                                {active}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Stage Completion Rates */}
              <div className="bg-white p-6 rounded-lg shadow mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">✅ Stage Completion Rates</h3>
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { key: 'approval', label: 'Approval' },
                    { key: 'preOp', label: 'Pre-Op' },
                    { key: 'anesthesia', label: 'Anesthesia' },
                    { key: 'operationBooking', label: 'OR Booking' },
                    { key: 'admission', label: 'Admission' },
                    { key: 'reporting', label: 'Reporting' },
                    { key: 'billing', label: 'Billing' },
                    { key: 'postOp', label: 'Post-Op' }
                  ].map(stage => {
                    const completed = orders.filter(o => 
                      o.stageStatuses[stage.key].status === 'completed' || 
                      o.stageStatuses[stage.key].status === 'approved'
                    ).length;
                    const percentage = (completed / orders.length * 100).toFixed(0);
                    return (
                      <div key={stage.key} className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="text-2xl font-bold text-gray-800">{percentage}%</div>
                        <div className="text-xs text-gray-600 mt-1">{stage.label}</div>
                        <div className="text-xs text-gray-500 mt-1">({completed}/{orders.length})</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Alerts & Bottlenecks */}
              <div className="bg-white p-6 rounded-lg shadow mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">⚠️ Alerts & Bottlenecks</h3>
                <div className="space-y-2">
                  {orders.filter(o => o.currentStage === 'anesthesia' && o.stageStatuses.anesthesia.status === 'in-progress').length > 0 && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                      <p className="text-sm font-semibold text-yellow-800">
                        {orders.filter(o => o.currentStage === 'anesthesia' && o.stageStatuses.anesthesia.status === 'in-progress').length} order(s) awaiting anesthesia clearance
                      </p>
                    </div>
                  )}
                  {orders.filter(o => o.stageStatuses.approval.status === 'partial').length > 0 && (
                    <div className="bg-orange-50 border-l-4 border-orange-400 p-3 rounded">
                      <p className="text-sm font-semibold text-orange-800">
                        {orders.filter(o => o.stageStatuses.approval.status === 'partial').length} order(s) with partial approval - pending additional authorization
                      </p>
                    </div>
                  )}
                  {orders.filter(o => o.currentStage === 'preOp' && o.stageStatuses.preOp.status === 'in-progress').length > 0 && (
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
                      <p className="text-sm font-semibold text-blue-800">
                        {orders.filter(o => o.currentStage === 'preOp' && o.stageStatuses.preOp.status === 'in-progress').length} order(s) in Pre-Op stage - labs or booking pending
                      </p>
                    </div>
                  )}
                  {orders.filter(o => o.currentStage === 'approval').length > 0 && (
                    <div className="bg-red-50 border-l-4 border-red-400 p-3 rounded">
                      <p className="text-sm font-semibold text-red-800">
                        {orders.filter(o => o.currentStage === 'approval').length} order(s) pending initial approval
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Surgery Types Analysis */}
              <div className="bg-white p-6 rounded-lg shadow mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">🔬 Surgery Types Analysis</h3>
                <div className="space-y-2">
                  {(() => {
                    const surgeryCount = {};
                    const surgeryApproved = {};
                    orders.forEach(order => {
                      order.surgeries.forEach(surgery => {
                        surgeryCount[surgery.name] = (surgeryCount[surgery.name] || 0) + 1;
                        if (surgery.approved) {
                          surgeryApproved[surgery.name] = (surgeryApproved[surgery.name] || 0) + 1;
                        }
                      });
                    });
                    
                    return Object.entries(surgeryCount)
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 5)
                      .map(([name, count]) => {
                        const approved = surgeryApproved[name] || 0;
                        const rate = (approved / count * 100).toFixed(0);
                        return (
                          <div key={name} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span className="text-sm font-semibold text-gray-700">{name}</span>
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-gray-600">Total: {count}</span>
                              <span className={`text-sm px-2 py-1 rounded ${rate >= 80 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                Approved: {rate}%
                              </span>
                            </div>
                          </div>
                        );
                      });
                  })()}
                </div>
              </div>

              {/* Post-Op Follow-up Compliance */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-bold text-gray-800 mb-4">💊 Post-Op Follow-up Compliance</h3>
                <div className="grid grid-cols-4 gap-4">
                  {(() => {
                    const postOpOrders = orders.filter(o => 
                      o.stageStatuses.postOp.status === 'in-progress' || 
                      o.stageStatuses.postOp.status === 'completed'
                    );
                    
                    if (postOpOrders.length === 0) {
                      return <div className="col-span-4 text-center text-gray-500 py-4">No post-op data available yet</div>;
                    }
                    
                    const metrics = [
                      { label: '48 Hour Call', substage: '48 Hour Call' },
                      { label: 'Follow-up Appt', substage: 'Follow-up Appointment' },
                      { label: 'Physical Therapy', substage: 'Physical Therapy' },
                      { label: 'Post-op Meds', substage: 'Post-op Medication' }
                    ];
                    
                    return metrics.map(metric => {
                      const completed = postOpOrders.filter(o => 
                        o.stageStatuses.postOp.subStages.find(s => s.name === metric.substage)?.completed
                      ).length;
                      const percentage = (completed / postOpOrders.length * 100).toFixed(0);
                      
                      return (
                        <div key={metric.label} className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="text-2xl font-bold text-gray-800">{percentage}%</div>
                          <div className="text-xs text-gray-600 mt-1">{metric.label}</div>
                          <div className="text-xs text-gray-500 mt-1">({completed}/{postOpOrders.length})</div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="bg-gray-100 px-6 py-3 flex justify-between items-center border-t border-gray-300 flex-shrink-0">
              <p className="text-xs text-gray-600">Click outside, press ESC, or use the red CLOSE button to close</p>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  closeExecutiveSummary();
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold text-sm"
              >
                Close Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedStage && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="bg-blue-600 text-white p-4 flex justify-between items-center flex-shrink-0">
              <div>
                <h2 className="text-xl font-bold capitalize">{selectedStage.replace(/([A-Z])/g, ' $1').trim()}</h2>
                <p className="text-xs">Patient: {selectedOrder.patientInfo.patientName}</p>
              </div>
              <button onClick={onClose} className="hover:bg-white hover:bg-opacity-20 rounded-full p-2">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-3 overflow-y-auto flex-1">
              <div className="bg-gray-50 p-2 rounded mb-2">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <p><span className="font-semibold">Name:</span> {selectedOrder.patientInfo.patientName}</p>
                  <p><span className="font-semibold">ID:</span> {selectedOrder.patientInfo.patientId}</p>
                </div>
              </div>

              {selectedStage === 'preOp' && (
                <div className="bg-green-50 border-l-2 border-green-400 p-2 mb-2">
                  <h3 className="font-bold text-xs mb-1">Surgical Facility</h3>
                  <select className="w-full p-1 border rounded text-xs mb-1">
                    <option>Inside (KR-OR)</option>
                    <option>Outside</option>
                  </select>
                  <select className="w-full p-1 border rounded text-xs mb-1">
                    <option>Samir Abbas Hospital</option>
                    <option>Abuznadah Hospital</option>
                  </select>
                  <label className="flex items-center text-xs">
                    <input type="checkbox" className="mr-1 w-3 h-3" />
                    Care Program
                  </label>
                </div>
              )}

              <div className="space-y-2">
                <h3 className="font-bold text-xs">Sub-Stages</h3>
                {selectedOrder.stageStatuses[selectedStage].subStages.map((subStage, idx) => (
                  <div key={idx} className="bg-gray-50 rounded p-1.5 border">
                    <label className="flex items-center text-xs mb-0.5">
                      <input type="checkbox" checked={subStage.completed} className="mr-1 w-3 h-3" readOnly />
                      {subStage.name}
                    </label>
                    {subStage.completed && subStage.completedBy && (
                      <div className="ml-4 text-xs bg-blue-50 p-1 rounded">
                        <p className="text-xs">{subStage.completedBy} - {subStage.completedDate} {subStage.completedTime}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-2">
                <label className="block text-xs font-semibold mb-1">Notes</label>
                <textarea className="w-full p-1 border rounded text-xs" rows="2" placeholder="Notes..."></textarea>
              </div>

              {selectedOrder.stageStatuses[selectedStage].cancelled !== undefined && (
                <div className="bg-yellow-50 border-l-2 border-yellow-400 p-2 mt-2">
                  <h3 className="font-bold text-xs mb-1">Actions</h3>
                  <label className="flex items-center text-xs mb-1">
                    <input type="checkbox" className="mr-1 w-3 h-3" />
                    Cancel
                  </label>
                  <textarea className="w-full p-1 border rounded text-xs mb-1" rows="2" placeholder="Reason..."></textarea>
                  <label className="flex items-center text-xs mb-1">
                    <input type="checkbox" className="mr-1 w-3 h-3" />
                    Reschedule
                  </label>
                  <label className="flex items-center text-xs">
                    <input type="checkbox" className="mr-1 w-3 h-3" />
                    Follow-up
                  </label>
                </div>
              )}
            </div>

            <div className="bg-gray-50 px-3 py-2 flex justify-end space-x-2 flex-shrink-0">
              <button onClick={onClose} className="px-3 py-1.5 border rounded hover:bg-gray-100 text-xs">Cancel</button>
              <button onClick={onClose} className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurgicalStagesUI;